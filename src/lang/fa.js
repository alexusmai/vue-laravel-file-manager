/**
 * Farsi translate
 * vahidalvandi
 * @type Object
 */
const fa = {
  btn: {
    about: 'درباره',
    back: 'عقب',
    cancel: 'لغو',
    clear: 'پاک کردن',
    copy: 'رونوشت',
    cut: 'برش',
    delete: 'حذف',
    edit: 'ویرایش',
    forward: 'ارسال به دیگری',
    folder: 'پوشه جدید',
    file: 'فایل جدید',
    fullScreen: 'تمام صفحه',
    grid: 'شبکه',
    paste: 'جانمایی/چسباندن/جاگذاری',
    refresh: 'تازه کردن صفحه',
    submit: 'تایید و ارسال',
    table: 'جدول',
    upload: 'بارگذاری',
    uploadSelect: 'انتخاب فایل',
    hidden: ' فایل های مخفی',
  },
  clipboard: {
    actionType: 'نوع',
    copy: 'رونوشت',
    cut: 'برش',
    none: 'چیزی انتخاب نشده است',
    title: 'کلیپ بورد',
  },
  contextMenu: {
    copy: 'رونوشت',
    cut: 'برش',
    delete: 'حذف',
    download: 'دانلود',
    info: 'انتخاب شده:',
    open: 'باز کردن',
    paste: 'جاگذاری',
    properties: 'ویژگی ها',
    rename: 'تغییر نام',
    select: 'انتخاب',
    view: 'مشاهده',
    zip: 'فشرده کردن',
    unzip: 'از حالت فشرده خارج کردن',
    edit: 'ویرایش',
    audioPlay: 'پخش',
    videoPlay: 'نمایش',
  },
  info: {
    directories: 'پوشه ها:',
    files: 'فایل ها:',
    selected: 'انتخاب شده ها:',
    selectedSize: 'اندازه فایل ها:',
    size: 'اندازه فایل ها:',
  },
  manager: {
    table: {
      date: 'تاریخ',
      folder: 'پوشه',
      name: 'نام',
      size: 'اندازه',
      type: 'نوع',
    },
  },
  modal: {
    about: {
      developer: 'توسعه دهنده',
      name: 'مدیریت فایل',
      title: 'درباره',
      version: 'نسخه',
    },
    delete: {
      noSelected: 'چیزی انتخاب نشده است',
      title: 'حذف',
    },
    newFile: {
      fieldName: 'نام فایل',
      fieldFeedback: 'فایل وجود دارد!',
      title: 'فایل جدید ایجاد کنید',
    },
    newFolder: {
      fieldName: 'نام پوشه',
      fieldFeedback: 'پوشه وجود دارد!',
      title: 'پوشه جدید ایجاد کنید',
    },
    preview: {
      title: 'پیش نمایش',
    },
    properties: {
      disk: 'Disk',
      modified: 'اصلاح شده',
      name: 'نام',
      path: 'مسیر',
      size: 'اندازه',
      title: 'ویژگی ها',
      type: 'نوع',
      url: 'آدرس اینترنتی',
      access: 'دسترسی',
      access_0: 'دسترسی امکان پذیر نیست',
      access_1: 'فقط خواندن',
      access_2: 'خواندن و نوشتن',
    },
    rename: {
      directoryExist: 'فهرست وجود دارد',
      fieldName: 'نام جدید را وارد نمایید',
      fieldFeedback: 'نام نامعتبر است',
      fileExist: 'فایل وجود دارد',
      title: 'تغییر نام',
    },
    status: {
      noErrors: 'خطایی وجود ندارد!',
      title: 'وضعیت',
    },
    upload: {
      ifExist: 'اگر فایل وجود دارد:',
      noSelected: 'هیچ فایلی انتخاب نشده است!',
      overwrite: 'بازنویسی!',
      selected: 'انتخاب شده ها/انتخاب شده است:',
      size: 'اندازه:',
      skip: 'رد شدن',
      title: 'بارگزاری فایل ها',
    },
    editor: {
      title: 'ویرایشگر',
    },
    audioPlayer: {
      title: 'پخش کننده فایل صوتی',
    },
    videoPlayer: {
      title: 'نمایش دهنده ویدیو',
    },
    zip: {
      title: 'ایجاد بایگانی',
      fieldName: 'نام بایگانی',
      fieldFeedback: 'بایگانی وجود دارد',
    },
    unzip: {
      title: 'باز کردن بایگانی',
      fieldName: 'نام پوشه',
      fieldRadioName: 'استخراج شود به:',
      fieldRadio1: 'به پوشه فعلی',
      fieldRadio2: 'در یک پوشه جدید',
      fieldFeedback: 'پوشه وجود دارد!',
      warning: 'توجه! اگر نام ها تکراری باشند، فایل های قدیمی با فایل های جدید جایگزین خواهند شد',
    },
    cropper: {
      title: 'کوچک کردن',
      apply: 'اجرا',
      reset: 'تنظیم مجدد',
      save: 'ذخیره',
    },
  },
  notifications: {
    cutToClipboard: 'برش یه کلیپ بورد!',
    copyToClipboard: 'رونوشت به کلیپ بورد!',
  },
  response: {
    noConfig: 'پیکربندی یافت نشد',
    notFound: 'یافت نشد',
    diskNotFound: 'دیسک یافت نشد !',
    pathNotFound: 'مسیر یافت نشد!',
    diskSelected: 'دیسک انتخاب شد !',
    // files
    fileExist: ' در حال حاضر فایل مورد نظر وجود دارد!',
    fileCreated: 'فایل ایجاد شد!',
    fileUpdated: 'فایل بروزرسانی شد!',
    fileNotFound: 'فایل یافت نشد!',
    // directories
    dirExist: 'در حال حاضر پیکربندی مورد نظر وجود دارد!',
    dirCreated: 'پیکربندی ایجاد شد!',
    dirNotFound: 'پیکربندی یافت نشد',
    // actions
    uploaded: 'همه فایل ها بارگذاری شده اند!',
    notAllUploaded: 'برخی از فایل ها بارگذاری نشده اند!',
    delNotFound: 'برخی از بخش ها یافت نشد!',
    deleted: 'حذف شد!',
    renamed: 'تغییر نام یافت!',
    copied: 'رونوشت با موفقیت انجام شد!',
    // zip
    zipError: 'خطای ایجاد بایگانی! zip',
    // acl
    aclError: 'دسترسی امکان پذیر نیست!',
  },
};

export default fa;
