import shape.CBox;


/**
 *
 * shape文件头数据结构
 */
public class ShapefileHeader
{
    public int fileCode = 0;//文件编号
    public int fileLength = 0;//文件长度
    public int version = 0;//版本号
    public int shpType = 0;//几何类型

    private CBox box = null;

    public int getFileCode()
    {
        return fileCode;
    }

    public void setFileCode( int fileCode )
    {
        this.fileCode = fileCode;
    }

    public int getFileLength()
    {
        return fileLength;
    }

    public int getShpType()
    {
        return shpType;
    }

    public int getVersion()
    {
        return version;
    }

    public void setVersion( int version )
    {
        this.version = version;
    }

    public void setShpType( int shpType )
    {
        this.shpType = shpType;
    }

//    public void setMiny( double miny )
//    {
//        this.miny = miny;
//    }
//
//    public void setMinx( double minx )
//    {
//        this.minx = minx;
//    }
//
//    public void setMaxy( double maxy )
//    {
//        this.maxy = maxy;
//    }

//    public void setMaxx( double maxx )
//    {
//        this.maxx = maxx;
//    }

    public void setFileLength( int fileLength )
    {
        this.fileLength = fileLength;
    }

    public CBox getBox()
    {
        return box;
    }

    public void setBox( CBox box )
    {
        this.box = box;
    }
}