/*
 * Copyright (C) 2011 Intel Corp
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA
 * 02111-1307, USA.
 *
 * Author: Ross Burton <ross.burton@intel.com>
 */

const Calendar = imports.ui.calendar;
const MSECS_IN_DAY = 24 * 60 * 60 * 1000;

function main() {
    Calendar._getCalendarWeekForDate = function(date) {
        /* This function is a slight modification of the ISO 8601 function in
         * gnome-shell/js/ui/calendar.js to give Intel Work Weeks, hopefully.
         *
         * https://intelpedia.intel.com/WW_-_Work_Week
         */
        let midnightDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let dayOfWeek = 1 + ((midnightDate.getDay() + 6) % 7);
        let nearestSaturday = new Date(midnightDate.getFullYear(), midnightDate.getMonth(),
                                       midnightDate.getDate() + (6 - dayOfWeek));
        let jan1st = new Date(nearestSaturday.getFullYear(), 0, 1, -6);
        let diffDate = nearestSaturday - jan1st;
        var dayNumber = Math.floor(Math.abs(diffDate) / MSECS_IN_DAY);
        let weekNumber = Math.floor(dayNumber / 7) + 1;
        return weekNumber;
    };
}
