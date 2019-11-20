/**
 * Serbian translate
 * Aleksandar Stevanović - aleks989
 * @type Object
 */
const sr = {
  btn: {
    about: 'O Nama',
    back: 'Nazad',
    cancel: 'Otkaži',
    clear: 'Očisti',
    copy: 'Kopiraj',
    cut: 'Iseci',
    delete: 'Obriši',
    edit: 'Izmeni',
    forward: 'Napred',
    folder: 'Novi direktorijum',
    file: 'Nova datoteka',
    fullScreen: 'Ceo ekran',
    grid: 'Mrežasti prikaz',
    paste: 'Nalepi',
    refresh: 'Osveži',
    submit: 'Potvrdi',
    table: 'Tabela',
    upload: 'Upload',
    uploadSelect: 'Izaberi datoteke',
    hidden: ' Skrivene datoteke',
  },
  clipboard: {
    actionType: 'Tip operacije',
    copy: 'Kopiraj',
    cut: 'Iseci',
    none: 'Ništa niste izabrali!',
    title: 'Clipboard',
  },
  contextMenu: {
    copy: 'Kopiraj',
    cut: 'Iseci',
    delete: 'Obriši',
    download: 'Preuzimanje',
    info: 'Izabrano:',
    open: 'Otvori',
    paste: 'Nalepi',
    properties: 'Svojstva',
    rename: 'Preimenuj',
    select: 'Izaberi',
    view: 'Pregledaj',
    zip: 'Arhiviraj',
    unzip: 'Izbaci iz arhive',
    edit: 'Izmeni',
    audioPlay: 'Reprodukuj',
    videoPlay: 'Reprodukuj',
  },
  info: {
    directories: 'Direktorijumi:',
    files: 'Datoteke:',
    selected: 'Izabrano:',
    selectedSize: 'Veličina fajla:',
    size: 'Veličina fajla:',
  },
  manager: {
    table: {
      date: 'Datum',
      folder: 'Datoteka',
      name: 'Naziv',
      size: 'Veličina',
      type: 'Vrsta',
    },
  },
  modal: {
    about: {
      developer: 'Razvio',
      name: 'Laravel File Manager',
      title: 'O Nama',
      version: 'Verzija',
    },
    delete: {
      noSelected: 'Ništa niste izabrali!',
      title: 'Obriši',
    },
    newFile: {
      fieldName: 'Naziv datoteke',
      fieldFeedback: 'Datoteka već postoji!',
      title: 'Kreiraj novu datoteku',
    },
    newFolder: {
      fieldName: 'Naziv direktorijuma',
      fieldFeedback: 'Direktorijum već postoji!',
      title: 'Kreiraj novi direktorijum',
    },
    preview: {
      title: 'Pregled',
    },
    properties: {
      disk: 'Disk',
      modified: 'Izmenjen',
      name: 'Naziv',
      path: 'Lokacija',
      size: 'Veličina',
      title: 'Svojstva',
      type: 'Tip datoteke',
      url: 'URL',
      access: 'Pristup',
      access_0: 'Pristup odbijen',
      access_1: 'Samo za čitanje',
      access_2: 'Pristup za čitanje i pisanje',
    },
    rename: {
      directoryExist: 'Direktorijum postoji',
      fieldName: 'Unesite novi naziv',
      fieldFeedback: 'Neispravan naziv',
      fileExist: 'Datoteka već postoji',
      title: 'Preimenuj',
    },
    status: {
      noErrors: 'Nema Grešaka!',
      title: 'Status',
    },
    upload: {
      ifExist: 'Ako datoteka postoji:',
      noSelected: 'Nema izabranih fajlova!',
      overwrite: 'Zameni!',
      selected: 'Izabrano:',
      size: 'Veličina:',
      skip: 'Preskoči',
      title: 'DOdaj fajlove',
    },
    editor: {
      title: 'Editor',
    },
    audioPlayer: {
      title: 'Audio plejer',
    },
    videoPlayer: {
      title: 'Video plejer',
    },
    zip: {
      title: 'Napravi arhivu',
      fieldName: 'Naziv Arhive',
      fieldFeedback: 'Arhiva Postoji!',
    },
    unzip: {
      title: 'Otpakuj arhivu',
      fieldName: 'Naziv direktorijuma',
      fieldRadioName: 'Otpakuj u:',
      fieldRadio1: 'U aktivni direktorijum',
      fieldRadio2: 'U novi direktorijum',
      fieldFeedback: 'Direktorijum Postoji!',
      warning: 'Pažnja! Ako se nazivi poklapaju, datoteke će biti prepisane!',
    },
    cropper: {
      title: 'Orezivanje',
      apply: 'Primeni',
      reset: 'Resetuj',
      save: 'Sačuvaj',
    },
  },
  notifications: {
    cutToClipboard: 'Isečeno u klipbord!',
    copyToClipboard: 'Kopirano u klipbord!',
  },
  response: {
    noConfig: 'Nema konfiguracije!',
    notFound: 'Nije pronađeno!',
    diskNotFound: 'Disk nije pronađen!',
    pathNotFound: 'Putanja nije pronađena!',
    diskSelected: 'Disk izabran!',
    // files
    fileExist: 'Datoteka već postoji!',
    fileCreated: 'Nova datoteka napravljena!',
    fileUpdated: 'Datoteka izmenjena!',
    fileNotFound: 'Datoteka nije pronadjena!',
    // directories
    dirExist: 'Direktorijum već postoji!',
    dirCreated: 'Novi direktorijum napravljen!',
    dirNotFound: 'Direktorijum nije pronađen',
    // actions
    uploaded: 'Sve datoteke poslate!',
    notAllUploaded: 'Some files weren\'t uploaded!',
    delNotFound: 'Nekoliko stavki nije pronađeno! Osvežite!',
    deleted: 'Obrisano!',
    renamed: 'Preimenovano!',
    copied: 'Uspešno kopirano!',
    // zip
    zipError: 'Greška u pravljenju arhive!',
    // acl
    aclError: 'Pristup odbijen!',
  },
};

export default sr;
