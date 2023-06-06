OpenSprinkler távoli hozzáférés az OpenThings Cloud (OTC) Token használatával

Bevezetés

A 2.2.0 firmware-től az OpenSprinkler 3.x támogatja a távoli hozzáférést OpenThings Cloud (OTC) tokenen keresztül. Ez kiküszöböli a porttovábbítás szükségességét (amelyet egyes routerek, különösen a mobil routerek esetében nehéz beállítani). A folytatás előtt győződj meg róla, hogy az OpenSprinkler firmware 2.2.0 vagy magasabb verziószámú. Ha nem, akkor kövesd az <a href="https://repa6.github.io/disp/sprinkler_update"> itt található utasításokat </a> a firmware 2.2.0-ra történő frissítéséhez. Az alábbi utasítások elmagyarázzák, hogyan hozz létre egy OTC tokent, és hogyan használd az OTC tokent a távoli hozzáféréshez.

A lépés: OTC token létrehozása

 1:   Menj a www.openthings.io oldalra, és jelentkezz be az opensprinkler.com bejelentkezési e-mail/felhasználónév és jelszó használatával. Ha még nincs opensprinkler.com fiókod, kérlek, lépj a www.opensprinkler.com oldalra, és kattints a "My Account" (Fiókom) gombra a tetején, majd regisztrálj egy új felhasználói fiókot. A két weboldal ugyanazt a bejelentkezést használja.

 2:   Miután bejelentkeztél az openthings.io oldalra, látni fogod a 'műszerfalat'. A műszerfal bal oldalán kattints a következő gombra
    'Az OpenThings eszközeim'
    Lásd az alábbi képet az illusztrációhoz.
    
   <p align="center">
   <img src="https://repa6.github.io/disp/pics/OTC_1.png" width=80%/>
   </p>
    
   NE kattints a "My OpenThings Blynk Devices" (amely a My OpenThings Blynk Devices felett található), mivel az a Blynk token létrehozására szolgál, nem pedig az OTC tokenre. 
  3:  Ezután írjd be az eszköz leírását, válaszd ki a legördülő listából az 'OpenSprinkler'-t, majd kattints az Új eszköz hozzáadása gombra. Ahogy az alábbi képen látható, egy új OpenSprinkler eszközt hoz létre, és megjelenik a fentebb bemutatott OTC token. A token 32 karakter hosszú. Ezt a tokent kell bemásolni és beilleszteni az OpenSprinkler beállításaiba (lásd alább).
    
   <p align="center">
   <img src="https://repa6.github.io/disp/pics/OTC_2.png" width=80%/>
   </p>
    
B. lépés: Az OpenSprinkler beállításainak frissítése

  1:  Az OpenSprinkler készülék beállításait meg kell változtatni, hogy engedélyezze az OTC tokent. Ehhez nyiss meg egy böngészőt, és írjd be a készülék IP-címét, ennek meg kell jelenítenie a webes felhasználói felületet.
  2:  Kattints a jobb alsó sarokban lévő ikonra a "Beállítások szerkesztése" menüponthoz, majd kattints az "Integráció" fülre. Válaszd az Engedélyezés lehetőséget. Ezután másold/illeszd be a teljes OTC-tokent a Token mezőbe. Az alapértelmezett OTC szerver a ws.cloud.openthings.io, az alapértelmezett port pedig a 80-as. Ezeket változatlanul hagyhatod az alábbi képnek megfelelően.
  3:  Mentsd el a módosításokat, és végül indítsd újra az OpenSprinklert. Most már minden készen áll.
    
   <p align="center">
   <img src="https://repa6.github.io/disp/pics/OTC_3.png" width=20%/>
   </p>
    
  4:  Annak ellenőrzéséhez, hogy az OTC cloud kapcsolat érvényes-e, a vezérlő újraindítása után a kezdőlapon balról jobbra húzva (vagy a bal felső sarokban lévő ikonra kattintva) nyisd meg a bal oldali menüt, majd kattints a 'Rendszerdiagnosztika' menüpontra. A panel alján az OTC állapota látható. Ha azt mutatja, hogy 'Connected', az azt jelenti, hogy a kapcsolat sikeres. Ha azt mutatja, hogy 'Connecting...', akkor 30 másodpercig várj, és ellenőrizze újra. Ha az OTC állapot 'Not enabled' (Nem engedélyezve), vagy 'Disconnected' (Megszakítva), a kapcsolat valamilyen oknál fogva meghiúsult. Lásd az alábbi képet.
    
   <p align="center">
   <img src="https://repa6.github.io/disp/pics/OTC_4.png" width=20%/>
   </p>
    

C. lépés: Az OTC Token használata távoli hozzáféréshez

Az OpenSprinkler mobilalkalmazás jelenlegi verziója támogatja az eszközök hozzáadását az OTC token alapján.

Egy webböngészőben a https://ui.opensprinkler.com oldalra is beléphetsz, és az OTC token segítségével hozzáadhatsz egy eszközt.


Alternatívaként megnyithatod a böngészőt, és beírhatod a következőt:

https://cloud.openthings.io/forward/v1/token

ahol a token az OTC token. Ez lehetővé teszi a vezérlő távoli elérését. Ezt a linket könyvjelzőként is mentheted a böngészőben, vagy okostelefonos eszközön hozzáadhatod ezt a linket a kezdőlaphoz.
