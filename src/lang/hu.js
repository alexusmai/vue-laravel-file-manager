/**
 * Hungarian translation
 * https://github.com/gazben
 * @type Object
 */
const hu = {
    btn: {
        about: 'Rólunk',
        back: 'Vissza',
        cancel: 'Mégse',
        clear: 'Törlés',
        copy: 'Másolás',
        cut: 'Kivágás',
        delete: 'Törlés',
        edit: 'Szerkesztés',
        forward: 'Továbbítás',
        folder: 'Új mappa',
        file: 'Új fájl',
        fullScreen: 'Teljes képernyő',
        grid: 'Rács nézet',
        paste: 'Beillesztés',
        refresh: 'Frissítés',
        submit: 'Mentés',
        table: 'Táblázat nézet',
        upload: 'Feltöltés',
        uploadSelect: 'Fájlok kiválasztása',
        hidden: ' Rejtett fájlok',
    },
    clipboard: {
        actionType: 'Típus',
        copy: 'Másolás',
        cut: 'Kivágás',
        none: 'Nincs kiválasztás',
        title: 'Vágólap',
    },
    contextMenu: {
        copy: 'Másolás',
        cut: 'Kivágás',
        delete: 'Törlés',
        download: 'Letöltés',
        info: 'Kiválasztva:',
        open: 'Megnyitás',
        paste: 'Beillesztés',
        properties: 'Tulajdonságok',
        rename: 'Átnevezés',
        select: 'Kiválaszt',
        view: 'Megnyitás',
        zip: 'Becsomagolás',
        unzip: 'Kicsomagolás',
        edit: 'Szerkesztés',
        audioPlay: 'Lejátszás',
        videoPlay: 'Lejátszás',
    },
    info: {
        directories: 'Mappák:',
        files: 'Fájlok:',
        selected: 'Kiválasztva:',
        selectedSize: 'Fájlméret:',
        size: 'Fájlok mérete:',
    },
    manager: {
        table: {
            date: 'Dátum',
            folder: 'Mappa',
            name: 'Név',
            size: 'Méret',
            type: 'Típus',
        },
    },
    modal: {
        about: {
            developer: 'Developer',
            name: 'Laravel File Manager',
            title: 'About',
            version: 'Version',
        },
        delete: {
            noSelected: 'Nincs kiválsztva semmi!',
            title: 'Törlés',
        },
        newFile: {
            fieldName: 'Fájlnév',
            fieldFeedback: 'A fájl létezik!',
            title: 'Új fájl létrehozása',
        },
        newFolder: {
            fieldName: 'Mappa neve',
            fieldFeedback: 'A mappa létezik!',
            title: 'Új mappa létrehozása',
        },
        preview: {
            title: 'Előlnézet',
        },
        properties: {
            disk: 'Lemez',
            modified: 'Módsítva',
            name: 'Név',
            path: 'Útvonal',
            size: 'Méret',
            title: 'Tulajdonságok',
            type: 'Típus',
            url: 'URL',
            access: 'Hozzáférés',
            access_0: 'Hozzáférés megtagadva',
            access_1: 'Csak olvasás',
            access_2: 'Olvasás és írás',
        },
        rename: {
            directoryExist: 'A mappa létezik',
            fieldName: 'Új név',
            fieldFeedback: 'Érvénytelen név',
            fileExist: 'Fájl létezik',
            title: 'Átnevezés',
        },
        status: {
            noErrors: 'Nincs hiba',
            title: 'Státusz',
        },
        upload: {
            ifExist: 'A fájl létezik:',
            noSelected: 'Nincs fájl kiválasztva!',
            overwrite: 'Felülírás!',
            selected: 'Kiválasztva:',
            size: 'Méret:',
            skip: 'Kihagyás',
            title: 'Fájlok feltöltése',
        },
        editor: {
            title: 'Szerkesztő',
        },
        audioPlayer: {
            title: 'Hagfájl lejátszó',
        },
        videoPlayer: {
            title: 'Videófájl lejátszó',
        },
        zip: {
            title: 'Becsomagolás',
            fieldName: 'Archívum neve',
            fieldFeedback: 'Archívum már létezik!',
        },
        unzip: {
            title: 'Kicsomagolás',
            fieldName: 'Mappa neve',
            fieldRadioName: 'Kicsomagolás:',
            fieldRadio1: 'Jelenlegi mappába',
            fieldRadio2: 'Új mappába',
            fieldFeedback: 'Mappa létezik!',
            warning: 'Vigyázz! Amennyiben a nevek egyeznek akkor a fájlok felülírásra kerülnek!',
        },
        cropper: {
            title: 'Kivágás',
            apply: 'Apply',
            reset: 'Visszaállítás',
            save: 'Mentés',
        },
    },
    notifications: {
        cutToClipboard: 'Kivágás a vágólapra!',
        copyToClipboard: 'Másolás a vágólapra!',
    },
    response: {
        noConfig: 'Konfiguráció nem található!',
        notFound: 'Nem találáható!',
        diskNotFound: 'Lemez nem található!',
        pathNotFound: 'Útvonal nem található!',
        diskSelected: 'Lemez kiválasztva!',
        // files
        fileExist: 'Fájl már létezik!',
        fileCreated: 'Fájl létrehozva!',
        fileUpdated: 'Fájl frissítve!',
        fileNotFound: 'Fájl nem található!',
        // directories
        dirExist: 'Mappa már létezik!',
        dirCreated: 'Mappa létrehozva!',
        dirNotFound: 'Mappa nem található',
        // actions
        uploaded: 'Minden fájl feltöltve!',
        notAllUploaded: 'Néhány fájl nem került feltöltésre!',
        delNotFound: 'Néhány fájl nem található!',
        deleted: 'Törölve!',
        renamed: 'Átnevezve!',
        copied: 'Sikeres másolás!',
        // zip
        zipError: 'Hiba becsomagolás közben!',
        // acl
        aclError: 'Hozzáférés megtagadva!',
    },
};

export default hu;
