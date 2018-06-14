import java.io.DataInputStream;
import java.io.EOFException;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;

/**
 *
 * shape dbf
 * 
 */
public class DBFReader
{
    /**
     * dbf input stream
     */
    private DataInputStream stream;

    /**
     * all field
     */
    private JDBField fields[];

    /**
     * all record byte array
     */
    private byte nextRecord[];

    /**
     *Opens a DBF file for reading.
     * @param fileName the name of the file
     * @throws JDBFException
     */
    public DBFReader( String fileName ) throws JDBFException
    {
        this.stream = null;
        this.fields = null;
        this.nextRecord = null;
        try
        {
            init( new FileInputStream( fileName ) );
        }
        catch ( FileNotFoundException filenotfoundexception )
        {
            throw new JDBFException( filenotfoundexception );
        }
    }

    /**
     * Opens a stream, containing DBF for reading.
     * @param is  the InputStream
     * @throws JDBFException
     */
    public DBFReader( InputStream is ) throws JDBFException
    {
        this.stream = null;
        this.fields = null;
        this.nextRecord = null;
        init( is );
    }

    /**
     * read dbf reader,field header, and all byte of record
     * @param inputstream
     * @throws JDBFException
     */
    private void init( InputStream inputstream ) throws JDBFException
    {
        try
        {
            this.stream = new DataInputStream( inputstream );
            int i = readHeader();
            this.fields = new JDBField[i];
            int j = 1;
            for ( int k = 0; k < i; k++ )
            {
                this.fields[k] = readFieldHeader();
                j += this.fields[k].getLength();
            }

            if ( this.stream.read() < 1 )
                throw new JDBFException( "Unexpected end of file reached." );
            this.nextRecord = new byte[j];
            try
            {
                this.stream.readFully( nextRecord );
            }
            catch ( EOFException eofexception )
            {
                this.nextRecord = null;
                this.stream.close();
            }
        }
        catch ( IOException ioexception )
        {
            throw new JDBFException( ioexception );
        }
    }

    /**
     * read dbf header
     * @return
     * @throws IOException
     * @throws JDBFException
     */
    private int readHeader() throws IOException, JDBFException
    {
        byte abyte0[] = new byte[16];
        try
        {
            this.stream.readFully( abyte0 );
        }
        catch ( EOFException eofexception )
        {
            throw new JDBFException( "Unexpected end of file reached." );
        }
        int i = abyte0[8];
        if ( i < 0 )
            i += 256;
        i += 256 * abyte0[9];
        i = --i / 32;
        i--;
        try
        {
            this.stream.readFully( abyte0 );
        }
        catch ( EOFException eofexception1 )
        {
            throw new JDBFException( "Unexpected end of file reached." );
        }
        return i;
    }

    /**
     * read field header
     * @return
     * @throws IOException
     * @throws JDBFException
     */
    private JDBField readFieldHeader() throws IOException, JDBFException
    {
        byte abyte0[] = new byte[16];
        try
        {
            this.stream.readFully( abyte0 );
        }
        catch ( EOFException eofexception )
        {
            throw new JDBFException( "Unexpected end of file reached." );
        }
        StringBuffer stringbuffer = new StringBuffer( 10 );
        for ( int i = 0; i < 10; i++ )
        {
            if ( abyte0[i] == 0 )
                break;
            stringbuffer.append( ( char ) abyte0[i] );
        }

        char c = ( char ) abyte0[11];
        try
        {
            this.stream.readFully( abyte0 );
        }
        catch ( EOFException eofexception1 )
        {
            throw new JDBFException( "Unexpected end of file reached." );
        }
        int j = abyte0[0];
        int k = abyte0[1];
        if ( j < 0 )
            j += 256;
        if ( k < 0 )
            k += 256;
        return new JDBField( stringbuffer.toString(), c, j, k );
    }

    /**
     * Returns the field count of the database file
     * @return the field count
     */
    public int getFieldCount()
    {
        return this.fields.length;
    }

    /**
     * Returns a field at a specified position
     * @param index the position
     * @return the field at that position
     */
    public JDBField getField( int index )
    {
        return this.fields[index];
    }

    /**
     * 检查文件中是否还有记录，有则true
     * 
     */
    public boolean hasNextRecord()
    {
        return this.nextRecord != null;
    }

    /**
         * Returns an array of objects, representing one record in the database file
     * @return database record
     * @throws JDBFException if there are no more records or if an error occurred reading the file
     */
    public Object[] nextRecord() throws JDBFException
    {
        if ( !hasNextRecord() )
            throw new JDBFException( "No more records available." );
        Object aobj[] = new Object[this.fields.length];
        int i = 1;
        for ( int j = 0; j < aobj.length; j++ )
        {
            int k = this.fields[j].getLength();
            StringBuffer stringbuffer = new StringBuffer( k );
            stringbuffer.append( new String( this.nextRecord, i, k ) );
            aobj[j] = this.fields[j].parse( stringbuffer.toString() );
            i += this.fields[j].getLength();
        }

        try
        {
            this.stream.readFully( this.nextRecord );
        }
        catch ( EOFException eofexception )
        {
            this.nextRecord = null;
        }
        catch ( IOException ioexception )
        {
            throw new JDBFException( ioexception );
        }
        return aobj;
    }

    /**
     * @todo Closes the reader
     * @throws JDBFException
     */
    public void close() throws JDBFException
    {
        this.nextRecord = null;
        try
        {
            this.stream.close();
        }
        catch ( IOException ioexception )
        {
            throw new JDBFException( ioexception );
        }
    }

    /**
     * @todo ȡ���ֶ�����
     * @param i �ֶ�����
     * @return
     */
    public Class getFieldClass( int i )
    {
        Class typeClass = null;

        switch ( fields[i].getType() )
        {
            case 'C':
                typeClass = String.class;
                break;

            case 'N':
                if ( fields[i].getDecimalCount() == 0 )
                {
                    typeClass = Integer.class;
                }
                else
                {
                    typeClass = Double.class;
                }
                break;

            case 'F':
                typeClass = Double.class;
                break;

            case 'L':
                typeClass = Boolean.class;
                break;

            case 'D':
                typeClass = Date.class;
                break;

            default:
                typeClass = String.class;
                break;
        }

        return typeClass;
    }

    public static void main( String[] args ) throws Exception
    {
        DBFReader reader = new DBFReader( "F:/D3数据可视化/数字城市/一公里测试数据/c121河流_Clip.dbf" );
        Class field = reader.getFieldClass( 0 );
        while( reader.hasNextRecord() )
        {
            Object[] record = reader.nextRecord();
            for( int i = 0;i < record.length;i++ )
            {
                System.out.print( record[i] + "," );
            }
            System.out.println("");
        }
    }
}