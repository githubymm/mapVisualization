import java.io.DataInputStream;
import java.io.IOException;
import java.io.FileWriter;

import shape.CBox;
import shape.CPoint;
import shape.CPolyLine;
import shape.CPolygon;
import shape.MultiPoint;

/**
 *
 * shape文件读取
 * 
 */
public class ShapeReader
{
    /**
     * @todo 读取头文件
     * @param dis
     * @return
     * @throws IOException
     */
    public static ShapefileHeader readerHeader( DataInputStream dis ) throws IOException
    {
        //文件编号
        int fileCode = dis.readInt();

        //五个未被使用的0
        dis.skipBytes( 20 );
        int length = dis.readInt();

        //文件长度
        byte[] w = new byte[4];
        dis.read( w,0,4 );
        int version = LittleEndianReader.readInt( w );

        //几何类型
        dis.read( w,0,4 );
        int shpType = LittleEndianReader.readInt( w );
        System.out.println("shapte_type:" + shpType);

        //minx
        byte[] d = new byte[8];
        dis.read( d,0,8 );
        double minx = LittleEndianReader.readDouble( d );
        System.out.println("minx:" + minx);

        //miny
        dis.read( d,0,8 );
        double miny = LittleEndianReader.readDouble( d );
        System.out.println("miny:" + miny);

        //maxx
        dis.read( d,0,8 );
        double maxx = LittleEndianReader.readDouble( d );
        System.out.println("maxx:" + maxx);

        //maxy
        dis.read( d,0,8 );
        double maxy = LittleEndianReader.readDouble( d );
        System.out.println("maxy:" + maxy);

        //设置shape文件头内容
        ShapefileHeader header = new ShapefileHeader();
        header.setFileCode( fileCode );
        header.setFileLength( length );
        header.setVersion( version );
        header.setShpType( shpType );
        header.setBox( new CBox( minx,miny,maxx,maxy ) );

        dis.skip( 32 ); 
        return header;
    }


    /**
     * 读取记录
     * @param dis 
     * @throws IOException
     */
    public static VList readRecord( DataInputStream dis ) throws IOException
    {
        
        VList records = new VArrayList();
        Object obj = null;
        while( dis.available() > 0 )
        {
            obj = readRecordXOffset( 0,dis );
            records.add( obj );
        }

        return records;
    }

    /**
     * offset偏移量
     */
    public static Object readRecordXOffset( int offset,DataInputStream dis ) throws IOException
    {
        dis.skip( offset*2 );

        //记录号
        int recNum = dis.readInt();

        //坐标记录长度
        int recLength = dis.readInt();

        // 获取几何类型
        byte[] w = new byte[4];
        dis.read( w, 0, 4 );
        int shpType = LittleEndianReader.readInt( w );

        Object rec = null;
        switch ( shpType )
        {
            case ShapeType.POLYGON:
                rec = readPolygon( dis );
                break;
            case ShapeType.POINT:
                rec = readPoint( dis );
                break;
            case ShapeType.POLYLINE:
                rec = readPolyLine( dis );
                break;
            default:
                break;
        }

        return rec;
    }

    /**
     * polygon
     */
    public static CPolygon readPolygon( DataInputStream dis ) throws IOException
    {
        //
        CBox box = readBox( dis );

        byte[] w = new byte[4];
        dis.read( w,0,4 );
        int numParts = LittleEndianReader.readInt( w );

        dis.read( w,0,4 );
        int numPoints = LittleEndianReader.readInt( w );

        //
        int[] partIndex = new int[numParts];
        int index = 0;
        for( int i = 0; i < numParts;i++ )
        {
            dis.read( w,0,4 );
            index = LittleEndianReader.readInt( w );
            partIndex[i] = index;
        }

        //
        CPoint pt = null;
        CPoint[] pts = new CPoint[numPoints];
        for( int i = 0; i < numPoints; i++ )
        {
            pt = readPoint( dis );
            pts[i] = pt;
        }

        return new CPolygon( box,numParts,numPoints,partIndex,pts );
    }

    /**
     * PolyLine
     */
    public static CPolyLine readPolyLine( DataInputStream dis ) throws IOException
    {
        CBox box = readBox( dis );

        byte[] w = new byte[4];
        dis.read( w,0,4 );
        int numParts = LittleEndianReader.readInt( w );

        dis.read( w,0,4 );
        int numPoints = LittleEndianReader.readInt( w );

        //
        int[] partIndex = new int[numParts];
        int index = 0;
        for( int i = 0; i < numParts;i++ )
        {
            dis.read( w,0,4 );
            index = LittleEndianReader.readInt( w );
            partIndex[i] = index;
        }

        //
        CPoint pt = null;
        CPoint[] pts = new CPoint[numPoints];
        for( int i = 0; i < numPoints; i++ )
        {
            pt = readPoint( dis );
            pts[i] = pt;
        }

        return new CPolyLine( box,numParts,numPoints,partIndex,pts );
    }


    /**
     * 坐标范围
     */
    private static CBox readBox( DataInputStream dis )  throws IOException
    {
        //minx
        byte[] d = new byte[8];
        dis.read( d,0,8 );
        double minx = LittleEndianReader.readDouble( d );

        //miny
        dis.read( d,0,8 );
        double miny = LittleEndianReader.readDouble( d );

        //maxx
        dis.read( d,0,8 );
        double maxx = LittleEndianReader.readDouble( d );

        //maxy
        dis.read( d,0,8 );
        double maxy = LittleEndianReader.readDouble( d );

        return new CBox( minx,miny,maxx,maxy );
    }

    /**
     * Point
     */
    public static CPoint readPoint( DataInputStream dis )  throws IOException
    {
        byte[] d = new byte[8];
        dis.read( d,0,8 );
        double x = LittleEndianReader.readDouble( d );

        dis.read( d,0,8 );
        double y = LittleEndianReader.readDouble( d );

        return new CPoint( x,y );
    }

    /**
     * MultiPoint
     */
    public static MultiPoint readMultiPoint( DataInputStream dis )  throws IOException
    {
        CBox box = readBox( dis );

        byte[] w = new byte[4];
        dis.read( w,0,4 );
        int numPoints = LittleEndianReader.readInt( w );

        CPoint pt = null;
        CPoint[] pts = new CPoint[numPoints];
        for( int i = 0; i < numPoints; i++ )
        {
            pt = readPoint( dis );
            pts[i] = pt;
        }

        return new MultiPoint( box,numPoints,pts );
    }

    /**
     * 
     */
    public static void outputAllTypes( DataInputStream dis ) throws IOException
    {
        boolean flag = true;
        while( flag )
        {
            int recNum = dis.readInt();

            int recLength = dis.readInt();

            byte[] w = new byte[4];
            dis.read( w, 0, 4 );
            int shpType = LittleEndianReader.readInt( w );

            int available = dis.available();
            if( available <= recLength *2 -4 )
            {
                flag = false;
            }
            else
            {
                dis.skip( recLength * 2 - 4 );
            }
        }

    }

    public static void main( String[] args ) throws Exception
    {

        String filePath = "C:\\Users\\yang\\Desktop\\c121河流_Clip.shp";
        java.io.FileInputStream fis = new java.io.FileInputStream( filePath );
        java.io.DataInputStream dis = new java.io.DataInputStream( fis );

        ShapefileHeader header = readerHeader( dis );
        java.io.BufferedWriter fw = new java.io.BufferedWriter(new FileWriter("h:\\a.shp") );

        VList list = readRecord( dis );
        for( int i = 0; i< list.size(); i++ )
        {
            CPolygon p = (CPolygon)list.get( i );
            CPoint[] pts = p.getPts();
            for( int j = 0; j < pts.length; j++ )
            {
                fw.write( (int)pts[j].getX() + "," + (int)pts[j].getY() + "\r\n" );
            }
        }
        fw.flush();
    }
}
