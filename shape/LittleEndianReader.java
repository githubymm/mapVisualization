import java.io.IOException;

public class LittleEndianReader
{
    public LittleEndianReader()
    {
    }

    /**
     * @todo 读取整型数据
     * @param w
     * @return
     * @throws IOException
     */
    public static int readInt( byte[] w ) throws IOException
    {
        return ( w[3] ) << 24 | ( w[2] & 0xff ) << 16 | ( w[1] & 0xff ) << 8 |
            ( w[0] & 0xff );
    }

    /**
     * @todo 读取double型数据
     * @param w
     * @return
     * @throws IOException
     */
    public static double readDouble(  byte[] w ) throws IOException
    {
        long lvalue= ( long ) ( w[7] ) << 56 | ( long ) ( w[6] & 0xff ) << 48 |
            ( long ) ( w[5] & 0xff ) << 40 | ( long ) ( w[4] & 0xff ) << 32 |
            ( long ) ( w[3] & 0xff ) << 24 | ( long ) ( w[2] & 0xff ) << 16 |
            ( long ) ( w[1] & 0xff ) << 8 | ( long ) ( w[0] & 0xff );
        return Double.longBitsToDouble( lvalue );
    }

    public static void main(String[] args)
    {
        LittleEndianReader littleEndianReader1 = new LittleEndianReader();
    }

}