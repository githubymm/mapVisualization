import java.util.Vector;


/**
 *
 * 线类型
 * 
 */
public class Line 
{
    public Line()
    {
    }

    public Line( Line line )
    {
        this( line.getPoints() );
    }

    /**
     *  比较参数形状是否与当前形状相同
     * @param obj
     * @return
     */
    public boolean equals( Object obj )
    {
        if ( obj instanceof Line )
        {
            return ( ( Line ) obj ).getPoints().equals( this.getPoints() );
        }
        else
        {
            return false;
        }
    }

    public String toString()
    {
        StringBuffer sb = new StringBuffer();
        sb.append( "Line include " + collection.size() + " point\n" );
        CIterator it = collection.iterator();
        int i = 0;
        CPoint point = null;
        while ( it.hasNext() )
        {
            i++;
            point = ( CPoint ) it.next();
            sb.append( "\tpoint " + i + " x=" + point.x + "\ty=" + point.y +
                       "\n" );
        }
        return sb.toString();
    }

    
}