
/**
 *
 * 多边形
 */
public class CPolygon extends Ring
{
    
    CBox box = null;
    int numParts;
    int numPoints;
    int[] partIndex;
    CPoint[] pts = null;

    int recordNum = 0;
    int contentLength = 0;

    public CPolygon()
    {
        //super();
    }

    /**
     * @param box 坐标范围
     * @param numParts 子环个数
     * @param numPoints 坐标点数
     * @param partIndex 子环索引
     * @param pts 点数组
     */
    public CPolygon( CBox box, int numParts, int numPoints, int[] partIndex,
                    CPoint[] pts )
    {
        this.box = box;
        this.numParts = numParts;
        this.numPoints = numPoints;
        this.partIndex = partIndex;
        this.pts = pts;
    }

    public CBox getBox()
    {
        return box;
    }

    public int getContentLength()
    {
        return contentLength;
    }

    public int getNumParts()
    {
        return numParts;
    }

    public int getNumPoints()
    {
        return numPoints;
    }

    public int[] getPartIndex()
    {
        return partIndex;
    }

    public CPoint[] getPts()
    {
        return pts;
    }

    public int getRecordNum()
    {
        return recordNum;
    }

    public void setBox( CBox box )
    {
        this.box = box;
    }

    public void setContentLength( int contentLength )
    {
        this.contentLength = contentLength;
    }

    public void setNumParts( int numParts )
    {
        this.numParts = numParts;
    }

    public void setNumPoints( int numPoints )
    {
        this.numPoints = numPoints;
    }

    public void setPartIndex( int[] partIndex )
    {
        this.partIndex = partIndex;
    }

    public void setPts( CPoint[] pts )
    {
        this.pts = pts;
    }

    public void setRecordNum( int recordNum )
    {
        this.recordNum = recordNum;
    }
    
}