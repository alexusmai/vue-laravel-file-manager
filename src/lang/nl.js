/**
 * Dutch (Netherlands) translate
 * Sibren  - https://github.com/siebsie23
 * Laurens - https://github.com/Laussii078
 * @type Object
 */
const nl = {
    // todo - need to translate
    btn: {
        about: 'Over',
        back: 'Terug',
        cancel: 'Annuleren',
        clear: 'Legen',
        copy: 'Kopiëren',
        cut: 'Knippen',
        delete: 'Verwijderen',
        edit: 'Bewerken',
        forward: 'Volgende',
        folder: 'Nieuwe map',
        file: 'Nieuw bestand',
        fullScreen: 'Volledig scherm',
        grid: 'Raster',
        paste: 'Plakken',
        refresh: 'Ververs',
        submit: 'Indienen',
        table: 'Tabel',
        upload: 'Uploaden',
        uploadSelect: 'Selecteer bestanden',
        hidden: ' Verborgen bestanden',
    },
    clipboard: {
        actionType: 'Type',
        copy: 'Kopiëren',
        cut: 'Knippen',
        none: 'Niks geselecteerd',
        title: 'Klembord',
    },
    contextMenu: {
        copy: 'Kopiëren',
        cut: 'Knippen',
        delete: 'Verwijderen',
        download: 'Download',
        info: 'Geselecteerd:',
        open: 'Open',
        paste: 'Plak',
        properties: 'Eigenschappen',
        rename: 'Hernoem',
        select: 'Selecteerd',
        view: 'Bekijken',
        zip: 'Inpakken',
        unzip: 'Uitpakken',
        edit: 'Bewerken',
        audioPlay: 'Afspelen',
        videoPlay: 'Afspelen',
    },
    info: {
        directories: 'Mappen:',
        files: 'Bestanden:',
        selected: 'Geselecteerd:',
        selectedSize: 'Bestand grootte:',
        size: 'Bestand grootte:',
    },
    manager: {
        table: {
            date: 'Datum',
            folder: 'Map',
            name: 'Naam',
            size: 'Grootte',
            type: 'Type',
        },
    },
    modal: {
        about: {
            developer: 'Ontwikkelaar',
            name: 'Laravel File Manager',
            title: 'Over',
            version: 'Versie',
        },
        delete: {
            noSelected: 'Niks geselecteerd!',
            title: 'Verwijderen',
        },
        newFile: {
            fieldName: 'Bestandsnaam',
            fieldFeedback: 'Bestand bestaat!',
            title: 'Nieuw bestand maken',
        },
        newFolder: {
            fieldName: 'Mapnaam',
            fieldFeedback: 'Map bestaat!',
            title: 'Nieuwe map maken',
        },
        preview: {
            title: 'Voorbeeld',
        },
        properties: {
            disk: 'Schijf',
            modified: 'Bewerkt',
            name: 'Naam',
            path: 'Pad',
            size: 'Grootte',
            title: 'EigenSchappen',
            type: 'Type',
            url: 'URL',
            access: 'Toegang',
            access_0: 'Geen toegang',
            access_1: 'Alleen Lezen',
            access_2: 'Lezen en Schrijven',
        },
        rename: {
            directoryExist: 'Bestand bestaat',
            fieldName: 'Nieuwe naam invoeren',
            fieldFeedback: 'Ongeldige naam',
            fileExist: 'Bestand bestaat',
            title: 'Hernoemen',
        },
        status: {
            noErrors: 'Geen errors!',
            title: 'Status',
        },
        upload: {
            ifExist: 'Als het bestand bestaat:',
            noSelected: 'Geen bestanden geselecteerd!',
            overwrite: 'Overschrijven!',
            selected: 'Geselecteerd:',
            size: 'Grootte:',
            skip: 'Overslaan',
            title: 'Bestanden uploaden',
        },
        editor: {
            title: 'Bewerker',
        },
        audioPlayer: {
            title: 'Audiospeler',
        },
        videoPlayer: {
            title: 'Videospeler',
        },
        zip: {
            title: 'Archief maken',
            fieldName: 'Archief naam',
            fieldFeedback: 'Archief bestaat!',
        },
        unzip: {
            title: 'Archief uitpakken',
            fieldName: 'Mapnaam',
            fieldRadioName: 'Uitpakken naar:',
            fieldRadio1: 'Naar huidige map',
            fieldRadio2: 'In een nieuwe map',
            fieldFeedback: 'Map bestaat!',
            warning: 'Attentie! Als bestandsnamen hetzelfde zijn worden de bestanden overschreven!',
        },
        cropper: {
            title: 'Bijsnijden',
            apply: 'Toepassen',
            reset: 'Resetten',
            save: 'Opslaan',
        },
    },
    notifications: {
        cutToClipboard: 'Knippen naar klembord!',
        copyToClipboard: 'Kopiëren naar klembord!',
    },
    // todo - need to translate - end
    response: {
        noConfig: 'Configuratie niet gevonden!',
        notFound: 'Niet gevonden!',
        diskNotFound: 'Schijf niet gevonden!',
        pathNotFound: 'Pad niet gevonden!',
        diskSelected: 'Schijf geselecteerd!',
        // files
        fileExist: 'Bestand bestaat al!',
        fileCreated: 'Bestand aangemaakt!',
        fileUpdated: 'Bestand bijgewerkt!',
        fileNotFound: 'Bestand niet gevonden!',
        // directories
        dirExist: 'Map bestaat al!',
        dirCreated: 'Map aangemaakt!',
        dirNotFound: 'Map niet gevonden',
        // actions
        uploaded: 'Alle bestanden zijn geüpload!',
        notAllUploaded: 'Sommige bestanden zijn niet geüpload!',
        delNotFound: 'Sommige bestanden konden niet worden gevonden!',
        deleted: 'Verwijderd!',
        renamed: 'Hernoemd!',
        copied: 'Succesvol gekopieerd!',
        // zip
        zipError: 'Fout bij het maken van archief!',
        // acl
        aclError: 'Toegang geweigerd!',
    },
};

export default nl;
