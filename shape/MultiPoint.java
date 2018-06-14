/**
 *
 *  MultiPoint可以包括许多Point，也可以包括MultiPoint
 */
public class MultiPoint extends MultiShape
{

    public MultiPoint()
    {
    }

    private CBox box = null;
    private int numPoints;
    private CPoint[] pts = null;

    /**
     *
     * @param box 边界
     * @param numPoints 点个数
     * @param pts 点数组
     */
    public MultiPoint( CBox box, int numPoints, CPoint[] pts )
    {
        this.box = box;
        this.numPoints = numPoints;
        this.pts = pts;
    }

    /**
     * @todo 取得边界
     * @return 边界
     */
    public CBox getBox()
    {
        return box;
    }

    /**
     * @todo 取得点个数
     * @return 点个数
     */
    public int getNumPoints()
    {
        return numPoints;
    }

    /**
     * @todo 取得点数组
     * @return 点数组
     */
    public CPoint[] getPts()
    {
        return pts;
    }

    public void setBox(CBox box)
    {
        this.box = box;
    }
    public void setNumPoints(int numPoints)
    {
        this.numPoints = numPoints;
    }
    public void setPts(CPoint[] pts)
    {
        this.pts = pts;
    }
}