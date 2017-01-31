$(document).ready(function () {

    /* This file uses 2 json files: - player-stats.json
     *                              - badges.json; newly created to use in getting the badges_sprites coordinates */

    var data = {};          // ******************* var that stores the results of the ajax request globally *******************

    $.ajax({

        "url": "../javascripts/player-stats.json",
        "type": "get",
        "dataType": "json",
        "success": function (data1) {

            data = data1;

            var items = '<option selected hidden> Select a player... </option>';        //initializing the drop-down

            // *******************populating the drop-down by fetching the first/last name from json, and  *******************
            // ******************* adding an id value to each tag - to populate the stats area when a player is selected  *******************

            for (var i = 0; i < data.players.length; i++) {
                items += "<option value='" + data.players[i].player.id + "'>" + data.players[i].player.name.first + " " + data.players[i].player.name.last + "</option>";
            }

            $("#input").html(items);

            // ******************* adding empty data before a selection has been made *******************
            $('.name').text("Name");
            $('.pos').text("Position");

            getBadge(0);        //function that adds an empty team badge img (sprite position: x=11, y=5)

            $('.appear').text("--");
            $('.goals').text("--");
            $('.assist').text("--");
            $('.gpm').text("--");
            $('.ppm').text("--");
        }
    });
            // ******************* adding a listener to fetch json data when a selection has been made *******************
            $('#input').on('change', function(e){

               $.each(data.players, function (i, obj) {

                    // ******************* looping through the data and checking if the selected id matches the player's id *******************
                   if(obj.player.id == $('select').val()) {

                       // ******************* calling a function that loads club badge from a sprite, that corresponds to team's id  *******************
                       getBadge(obj.player.currentTeam.id);

                       // ******************* creating a img tag and adding a corresponding image source file to it  *******************
                       var pic = "";
                       var srcp = "../images/p" + obj.player.id + ".png";       // ******************* source path of the player's image  *******************
                       $('.img_div').html("<img src='' class='player'>");
                       $('.player').attr('src', srcp);

                       // ******************* replacing the source url when a new selection is made *******************
                       $("#image_id").html(pic);

                       // ******************* replacing the previously created empty data with json results  *******************
                       $('.name').text(obj.player.name.first + " " +obj.player.name.last);
                       //$('.last').text(obj.player.name.last);
                       $('.pos').text(obj.player.info.positionInfo.slice(obj.player.info.positionInfo.lastIndexOf(' ')+1));
                       $('.appear').text(obj.stats[6].value);
                       $('.goals').text(obj.stats[0].value);
                       $('.assist').text(obj.stats[5].value);
                       $('.gpm').text((obj.stats[0].value / obj.stats[6].value).toFixed(2));
                       $('.ppm').text((obj.stats[4].value / obj.stats[7].value).toFixed(2));              //look into obj.stats[8]

                       return;
                   }

               });

            });

    }
   /* "error": function(jqXHR, status, error) {
        console.log("status:",status, "error", error);
       } */
);

function getBadge(obj) {

    $.ajax({
        "url": "../javascripts/badges.json", //  ******************* json file containing coordinates for manipulating with the sprites  *******************
        "type": "get",
        "dataType": "json",
        "success": function (data) {

            //  ******************* width and height of the badges_sprite_resized.png: 960 x 880  *******************

            var positionXY = (-(data.teams[obj].xpos * 80) + "px " + -(data.teams[obj].ypos * 80) +"px");

            //  ******************* adding the new background-position to css to display the correct badge  *******************
            $("#js_badge").css("background-position", positionXY);

        }/*,

        "error": function (obj) {
            var data = obj.responseText;
            console.log("It doesn't work");
            console.log(data);
            data = JSON.parse(data);

            var team = obj;

            var positionXY = ((data.teams[team].xpos * 80) + " " + data.teams[team].ypos * 80);
            console.log(data[team]);
            console.log(obj);

            $("#js_badge").css("background-position", positionXY);
        }*/

    });
}