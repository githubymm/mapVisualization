/**
 *
 * 多线形
 * shape多线形类型数据结构定义
 * 
 */
public class CPolyLine
{
    CBox box = null;
    int numParts;
    int numPoints;
    int[] partIndex;
    CPoint[] pts = null;

    public CPolyLine( CBox box, int numParts, int numPoints, int[] partIndex,
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

}