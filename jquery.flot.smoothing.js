/*
Smoothing Lines Plugin for flot.
Released under the GPLv3 license by Vladimir Panitskiy, July 2012.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

 */

(function ($) {
    var options = { };

    function init(plot) {


        options = plot.getOptions();

        function Splines(newData,rate) {
            var arrPoints = []

            if (newData.length < 6) {
                return newData
            }

            for (var i = 0; i < newData.length; ++i) {
                var cntElements = newData.length
                var P1x,P1y,P4x,P4y 

                if (i < 1) {
                    P1x = newData[0]
                    P1y = newData[1]
                } else {
                    P1x = newData[i-2]
                    P1y = newData[i-1]
                }

                var P2x = newData[i]
                var P2y = newData[i+1]

                var P3x = newData[i+2]
                var P3y = newData[i+3]

                if (i < cntElements - 4) {
                    P4x = newData[i+4]
                    P4y = newData[i+5]
                } else {
                    P4x = newData[i-2]
                    P4y = newData[i-1]
                }

                for (var j = 1; j < 100 + 1; j++) {
                    var t = j * 0.01;

                    var x = rate * ( -t * t * t + 2 * t * t - t) * P1x + rate * ( -t * t * t + t * t) * P2x + (2 * t * t * t - 3 * t * t + 1) * P2x + rate * (t * t * t - 2 * t * t + t) * P3x + ( -2 * t * t * t + 3 * t * t) * P3x + rate * (t * t * t - t * t) * P4x
                    var y = rate * ( -t * t * t + 2 * t * t - t) * P1y + rate * ( -t * t * t + t * t) * P2y + (2 * t * t * t - 3 * t * t + 1) * P2y + rate * (t * t * t - 2 * t * t + t) * P3y + ( -2 * t * t * t + 3 * t * t) * P3y + rate * (t * t * t - t * t) * P4y;

                    if(x >= 0 && y >= 0 && x <= newData[newData.length - 2]) {
                        if (options.xaxis.mode == 'time') { x = parseInt(x) }
                        arrPoints.push(x,y)
                    }
                }

                i++
            }
            
            return arrPoints
        }


        function smoothingData(plot, s, datapoints) {
                if (s.smoothing && s.smoothing.enable) {
                    var rate = s.smoothing.rate||0.5
                    if (rate > 1) { rate = 1 }
                    if (rate < 0) { rate = 0 }
                    newData = Splines(datapoints.points, rate);
                    datapoints.points = newData;
                }
        }

        plot.hooks.processDatapoints.push(smoothingData);

    }


    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'Smoothing',
        version: '0.1'
    });
})(jQuery);
