OpenSprinkler 3.x (OS3) OTA (Over-the-Air) firmware frissítés.

0:  Mielőtt továbblépne, győződjön meg róla, hogy az OpenSprinkler aktuális konfigurációit exportálja egy fájlba (vagy az alkalmazásba), hogy később importálni tudja azokat. Frissítse a mobilalkalmazást a legújabb verzióra (ha közvetlenül a webböngészőn keresztül fér hozzá a vezérlőhöz, akkor már készen áll, mivel az már frissítve van). Ezután:

1:   Töltse le a legfrissebb firmware-t (.bin fájlformátumban): http://raysfiles.com/os_compiled_firmware/v3.x/os_220_rev1.bin

2:   Feltételezve, hogy az opensprinkler rendszere már csatlakozik az otthoni WiFi routerhez), nyissa meg a böngészőt, és írja be a következőket:
    http://x.x.x.x/update
    ahol x.x.x.x.x az Ön opensprinkler rendszere eszközének IP-címe. Ennek hatására megjelenik a firmware-frissítés oldala. Válassza ki az 1. lépésben letöltött .bin fájlt, és írja be az OpenSprinkler eszköz jelszavát (az alapértelmezett jelszó opendoor, ha még nem változtatta meg). Küldje el, és várja meg, amíg a firmware frissítése befejeződik.
    
3:   A frissítés AP üzemmódba állítja az eszközt és minden beállítást töröl (ezért kellett a 0. lépésben elmenteni azokat). Keresse meg az OS_..... nevű wifi hálózatot és csatlakozzon rá.

4:   Nyisson meg egy böngészőt, és írja be:
    http://192.168.4.1
      A megjelenő oldalon adja meg a wifi beállításokat.
      
5:   Sikeres wifi csatlakozás után az applikációban keresse meg a vezérlőt és importálja a korábban elmentett beállításokat.
      Sikeres importálás után visszaállításra kerül minden, így a zóna nevek és az öntözési ütemtervek is (ellenőrizze ezeket, hogy megbizonyosodjon az importálás sikerességéről).
      


   (Alternatív megoldás) Ha a vezérlő WiFi AP módban van, akkor számítógépével vagy laptopjával csatlakozzon az AP SSID-hez (ez ki van nyomtatva az LCD képernyőre, OS_ formájában, amelyet hat szám vagy betű követ), majd nyisson meg egy böngészőt, és írja be:
    http://192.168.4.1/update
    Ekkor megjelenik a firmware frissítési oldal. Válassza ki az 1. lépésben letöltött .bin fájlt, és írja be az OpenSprinkler készülék jelszavát MD5 ellenőrző összeg formájában (az MD5 összeg előállításához használhat egy online MD5 hash generátort), majd küldje el. Ha például soha nem változtatta meg a jelszót, vagy ha gyári visszaállítást végzett, akkor ez a6d82bced638de3def1e9bbb4983225c (az opendoor alapértelmezett jelszó md5 összege).
