//сделать эвент на вызов init`a
var colshapesSystem_client = {

   systemInit( dataZones )
   {

      dataZones.forEach( element => //сюда передаем массив с колшейпами
      {
         spawnColshapes( element );
      } )

      function spawnColshapes( element )
      {
         mp.events.add( 'render', () =>
         {
            let x = element.pos.x; //поставить значение Х - тестил только на целых числах!
            let y = element.pos.y;//поставить значение Y - тестил только на целых числах!
            let z = element.pos.z;

            const ground = mp.game.gameplay.getGroundZFor3dCoord( x, y, z, 0, false );
            z = ground + 250;//поставить значение Z - тестил только на целых числах!

            let height = element.height; //ну тут все понятно
            let width = element.width;;//тут тоже
            let zoneId = element.colshapeId;
            //====================ДАЛЬШЕ МЕНЯТЬ НИЧЕГО НЕ РЕКОМЕНДУЮ
            let xRed;
            let yRed;
            let zHead;
            let xYellow;
            let yYellow;
            let xGreen;
            let yGreen;
            let xBlue;
            let yBlue;
            //---------------------Red
            if ( x < 0 )//width
            {
               xRed = x - ( width / 2 )
            }
            else//width
            {
               xRed = x + ( width / 2 )
            }
            if ( y < 0 )//height
            {
               yRed = y - ( height / 2 )
            }
            else//height
            {
               yRed = y + ( height / 2 )
            }
            if ( z < 0 )
            {
               zHead = ground
            }
            else
            {
               zHead = ground
            }

            //---------------------Yellow
            if ( x < 0 )//width
            {
               xYellow = x + ( width / 2 )
            }
            else//width
            {
               xYellow = x - ( width / 2 )
            }
            if ( y < 0 )//height
            {
               yYellow = y + ( height / 2 )
            }
            else//height
            {
               yYellow = y - ( height / 2 )
            }

            //---------------------Green
            if ( x < 0 )//width
            {
               xGreen = x + ( width / 2 )
            }
            else//width
            {
               xGreen = x - ( width / 2 )
            }
            if ( y < 0 )//height
            {
               yGreen = y - ( height / 2 )
            }
            else//height
            {
               yGreen = y + ( height / 2 )
            }
            //---------------------Blue
            if ( x < 0 )//width
            {
               xBlue = x - ( width / 2 )
            }
            else//width
            {
               xBlue = x + ( width / 2 )
            }
            if ( y < 0 )//height
            {
               yBlue = y + ( height / 2 )
            }
            else//height
            {
               yBlue = y - ( height / 2 )
            }

            //let zone;

            element.colshapeId = mp.game.graphics.drawBox( x, y, z, xRed, yRed, zHead, element.color.r, element.color.g, element.color.b, 150 )
            element.colshapeId = mp.game.graphics.drawBox( x, y, z, xYellow, yYellow, zHead, element.color.r, element.color.g, element.color.b, 150 )
            element.colshapeId = mp.game.graphics.drawBox( x, y, z, xGreen, yGreen, zHead, element.color.r, element.color.g, element.color.b, 150 )
            element.colshapeId = mp.game.graphics.drawBox( x, y, z, xBlue, yBlue, zHead, element.color.r, element.color.g, element.color.b, 150 )
            try
            {


               //try draw label
               element.colshapeId = mp.labels.new( "id: " + JSON.parse( zoneId ), new mp.Vector3( x, y, z + 10 ),
                  {
                     los: true,
                     font: 1,
                     drawDistance: 180,
                  } );
            } catch ( error )
            {
               mp.gui.chat.push( error )
            }
         } );


      }
   }
}
/* Координаты GTA 5
                  Z+     Y+
                  |     /
                  |    /
                  |   /
                  |  /
                  | /
    -X---------------------------X+
                  |
                  |
                  |
                  |
                  |
                  Z-
   */
