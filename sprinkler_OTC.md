OpenSprinkler távoli hozzáférés az OpenThings Cloud (OTC) Token használatával

Bevezetés

A 2.2.0 firmware-től az OpenSprinkler 3.x támogatja a távoli hozzáférést OpenThings Cloud (OTC) tokenen keresztül. Ez kiküszöböli a porttovábbítás szükségességét (amelyet egyes routerek, különösen a mobil routerek esetében nehéz beállítani). A folytatás előtt győződjön meg róla, hogy az OpenSprinkler firmware 2.2.0 vagy magasabb verziószámú. Ha nem, akkor kövesse az itt található utasításokat a firmware 2.2.0-ra történő frissítéséhez. Az alábbi utasítások elmagyarázzák, hogyan hozzon létre egy OTC tokent, és hogyan használja az OTC tokent a távoli hozzáféréshez.

A lépés: OTC token létrehozása

 1:   Menjen a www.openthings.io oldalra, és jelentkezzen be az opensprinkler.com bejelentkezési e-mail/felhasználónév és jelszó használatával. Ha még nincs opensprinkler.com fiókja, kérjük, lépjen a www.opensprinkler.com oldalra, és kattintson a "My Account" (Fiókom) gombra a tetején, majd regisztráljon egy új felhasználói fiókot. A két weboldal ugyanazt a bejelentkezést használja.

 2:   Miután bejelentkezett az openthings.io oldalra, látni fogja a 'műszerfalat'. A műszerfal bal oldalán kattintson a következő gombra
    'Az OpenThings eszközeim'
    Lásd az alábbi képet az illusztrációhoz.
    
   <p align="center">
   <img src="/pics/OTC_1.png" width=80%/>
   </p>
    
   NE kattintson a My OpenThings Blynk Devices (amely a My OpenThings Blynk Devices felett található), mivel az a Blynk token létrehozására szolgál, nem pedig az OTC tokenre. 
  3:  Ezután írja be az eszköz leírását, válassza ki a legördülő listából az 'OpenSprinkler'-t, majd kattintson az Új eszköz hozzáadása gombra. Az alábbi képen látható illusztrációval egy új OpenSprinkler eszközt hoz létre, és megjelenik a fentebb bemutatott OTC token. A token 32 karakter hosszú. Ezt a tokent kell bemásolnia és beillesztenie az OpenSprinkler beállításaiba (lásd alább).
    
   <p align="center">
   <img src="/pics/OTC_2.png" width=80%/>
   </p>
    
B. lépés: Az OpenSprinkler beállításainak frissítése

  1:  Az OpenSprinkler készülék beállításait meg kell változtatnia, hogy engedélyezze az OTC tokent. Ehhez nyisson meg egy böngészőt, és írja be a készülék IP-címét, ennek meg kell jelenítenie a webes felhasználói felületet.
  2:  Kattintson a jobb alsó sarokban lévő ikonra a "Beállítások szerkesztése" menüponthoz, majd kattintson az "Integráció" fülre. Válassza az Engedélyezés lehetőséget. Ezután másolja/illessze be a teljes OTC-tokenjét a Token mezőbe. Az alapértelmezett OTC szerver a ws.cloud.openthings.io, az alapértelmezett port pedig a 80-as. Ezeket változatlanul hagyhatja. Lásd az alábbi képet az illusztrációhoz.
  3:  Küldje el a módosításokat, és végül indítsa újra az OpenSprinklerét. Most már minden készen áll.
    
   <p align="center">
   <img src="/pics/OTC_3.png" width=80%/>
   </p>
    
  4:  Annak ellenőrzéséhez, hogy az OTC cloud kapcsolat érvényes-e, a vezérlő újraindítása után a kezdőlapon balról jobbra húzva (vagy a bal felső sarokban lévő ikonra kattintva) nyissa meg a bal oldali menüt, majd kattintson a 'Rendszerdiagnosztika' menüpontra. A panel alján az OTC állapota látható. Ha azt mutatja, hogy 'Connected', az azt jelenti, hogy a kapcsolat sikeres. Ha azt mutatja, hogy 'Connecting...', akkor 30 másodpercig várjon, és ellenőrizze újra. Ha az OTC nincs engedélyezve, az állapot a 'Not enabled' (Nem engedélyezve), vagy a 'Disconnected' (Megszakítva), ha a kapcsolat valamilyen oknál fogva meghiúsult. Lásd az alábbi képet az illusztrációhoz.
    
   <p align="center">
   <img src="/pics/OTC_4.png" width=80%/>
   </p>
    

C. lépés: Az OTC Token használata távoli hozzáféréshez

Az OpenSprinkler mobilalkalmazás jelenlegi verziója támogatja egy eszköz hozzáadását az OTC tokenje alapján. Távvezérlőhely hozzáadásához adjon hozzá egy eszközt az OTC tokenje segítségével.

Egy webböngészőben a https://ui.opensprinkler.com oldalra is beléphet, és az OTC tokenje segítségével hozzáadhat egy eszközt.


Alternatívaként megnyithatja a böngészőt, és beírhatja a következőt:

https://cloud.openthings.io/forward/v1/token

ahol a token az OTC token. Ez lehetővé teszi a vezérlő távoli elérését. Ezt a linket könyvjelzővel is megjelölheti a böngészőben, vagy okostelefonos eszközön hozzáadhatja ezt a linket a kezdőlaphoz.
