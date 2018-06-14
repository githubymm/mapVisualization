/**
 *
 * 地图几何形状边界类
 */
public class CBox
{
    private double minx;//x坐标最小值
    private double miny;//y坐标最小值
    private double maxx;//x坐标最大值
    private double maxy;//y坐标最大值

    public CBox( double minx, double miny, double maxx, double maxy )
    {
        this.minx = minx;
        this.miny = miny;
        this.maxx = maxx;
        this.maxy = maxy;
    }

    public double getMaxx()
    {
        return maxx;
    }

    public void setMaxx( double maxx )
    {
        this.maxx = maxx;
    }

    public void setMaxy( double maxy )
    {
        this.maxy = maxy;
    }

    public double getMaxy()
    {
        return maxy;
    }

    public double getMinx()
    {
        return minx;
    }

    public void setMinx( double minx )
    {
        this.minx = minx;
    }

    public double getMiny()
    {
        return miny;
    }

    public void setMiny( double miny )
    {
        this.miny = miny;
    }

    public String toString()
    {
        return new StringBuffer().append( "minx=").append(minx).append(",miny=").append(miny).append(",maxx=").append(maxx).append(",maxy=").append(maxy ).toString();
    }
}