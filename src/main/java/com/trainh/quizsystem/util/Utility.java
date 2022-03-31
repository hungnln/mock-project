package com.trainh.quizsystem.util;

import java.util.Date;

public class Utility {
    public static Date fixDate(Date datetime){
        if(datetime == null) return null;
        int month = datetime.getMonth() -1;
        datetime.setMonth(month);
        return datetime;
    }
}
