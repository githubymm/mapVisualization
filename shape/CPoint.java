
/**
 *
 * 点类
 */
public class CPoint implements CShape
{
    /**
     * 点的横坐标
     */
    public double x;

    /**
     * 点的纵坐标
     */
    public double y;

    /**
     * 构造函数，初始化点对象
     * @param x 点的横坐标
     * @param y 点的纵坐标
     */
    public CPoint( double x, double y )
    {
        this.x = x;
        this.y = y;
    }

    /**
     *
     * @param point
     */
    public CPoint( CPoint point )
    {
        this.x = point.x;
        this.y = point.y;
    }

    public double getX()
    {
        return this.x;
    }

    public void setX( double x )
    {
        this.x = x;
    }

    public double getY()
    {
        return this.y;
    }

    public void setY( double y )
    {
        this.y = y;
    }

    public String toString()
    {
        return "point(" + this.getX() + "," + this.getY() + ")";
    }
}
