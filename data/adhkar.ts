export type CategorySlug = 'morning' | 'evening' | 'prayer' | 'sleep' | 'travel' | 'istighfar' | 'duas';

export type AdhkarCategory = {
  slug: CategorySlug;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
};

export type Dhikr = {
  id: string;
  category: CategorySlug;
  text: string;
  source: string;
  target: number;
  note?: string;
};

export const categories: AdhkarCategory[] = [
  { slug: 'morning', title: 'أذكار الصباح', subtitle: 'ابدأ يومك بطمأنينة', icon: 'sunrise', color: '#55A9D9' },
  { slug: 'evening', title: 'أذكار المساء', subtitle: 'اختم يومك بسكينة', icon: 'moon', color: '#6B8CC4' },
  { slug: 'prayer', title: 'بعد الصلاة', subtitle: 'نور بين الصلوات', icon: 'heart', color: '#4B9B9B' },
  { slug: 'sleep', title: 'أذكار النوم', subtitle: 'ليلة هادئة وقلب مطمئن', icon: 'cloud', color: '#758BC1' },
  { slug: 'travel', title: 'السفر', subtitle: 'رفقة وحفظ في الطريق', icon: 'navigation', color: '#3B9FBA' },
  { slug: 'istighfar', title: 'الاستغفار', subtitle: 'راحة للقلب ومغفرة', icon: 'refresh-cw', color: '#4B83B5' },
  { slug: 'duas', title: 'أدعية مختارة', subtitle: 'من خير الدعاء', icon: 'feather', color: '#407A9A' },
];

export const adhkar: Dhikr[] = [
  {
    id: 'morning-1',
    category: 'morning',
    text: 'أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.',
    source: 'رواه مسلم',
    target: 1,
  },
  {
    id: 'morning-2',
    category: 'morning',
    text: 'اللهم بك أصبحنا وبك أمسينا، وبك نحيا وبك نموت وإليك النشور.',
    source: 'رواه الترمذي',
    target: 1,
  },
  {
    id: 'morning-3',
    category: 'morning',
    text: 'رضيت بالله رباً، وبالإسلام ديناً، وبمحمد صلى الله عليه وسلم نبياً.',
    source: 'ثلاث مرات · رواه أبو داود',
    target: 3,
  },
  {
    id: 'morning-4',
    category: 'morning',
    text: 'سبحان الله وبحمده.',
    source: 'مائة مرة · رواه مسلم',
    target: 100,
    note: 'من قالها مائة مرة حُطّت خطاياه وإن كانت مثل زبد البحر.',
  },
  {
    id: 'morning-5',
    category: 'morning',
    text: 'اللّهُ لا إلهَ إلاّ هوَ الحيُّ القيّومُ، لا تأخُذُهُ سِنةٌ ولا نومٌ، لهُ ما في السماواتِ وما في الأرضِ، من ذا الذي يشفعُ عندهُ إلاّ بإذنهِ، يعلمُ ما بينَ أيديهم وما خلفَهُم، ولا يحيطونَ بشيءٍ من علمهِ إلاّ بما شاءَ، وسِعَ كرسيُّهُ السماواتِ والأرضَ، ولا يؤودُهُ حفظُهُما، وهوَ العليُّ العظيمُ.',
    source: 'آية الكرسي · سورة البقرة ٢٥٥',
    target: 1,
  },
  {
    id: 'morning-6',
    category: 'morning',
    text: 'اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك عليّ وأبوء لك بذنبي فاغفر لي، فإنه لا يغفر الذنوب إلا أنت.',
    source: 'سيد الاستغفار · رواه البخاري',
    target: 1,
  },
  {
    id: 'morning-7',
    category: 'morning',
    text: 'اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً.',
    source: 'رواه ابن ماجه',
    target: 1,
  },
  {
    id: 'morning-8',
    category: 'morning',
    text: 'اللهم عافني في بدني، اللهم عافني في سمعي، اللهم عافني في بصري، لا إله إلا أنت.',
    source: 'ثلاث مرات · رواه أبو داود',
    target: 3,
  },
  {
    id: 'evening-1',
    category: 'evening',
    text: 'أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.',
    source: 'رواه مسلم',
    target: 1,
  },
  {
    id: 'evening-2',
    category: 'evening',
    text: 'أعوذ بكلمات الله التامات من شر ما خلق.',
    source: 'ثلاث مرات · رواه مسلم',
    target: 3,
  },
  {
    id: 'evening-3',
    category: 'evening',
    text: 'اللهم إني أسألك العفو والعافية في الدنيا والآخرة.',
    source: 'رواه أبو داود',
    target: 1,
  },
  {
    id: 'evening-4',
    category: 'evening',
    text: 'حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم.',
    source: 'سبع مرات · رواه أبو داود',
    target: 7,
  },
  {
    id: 'evening-5',
    category: 'evening',
    text: 'اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك عليّ وأبوء لك بذنبي فاغفر لي، فإنه لا يغفر الذنوب إلا أنت.',
    source: 'سيد الاستغفار · رواه البخاري',
    target: 1,
  },
  {
    id: 'evening-6',
    category: 'evening',
    text: 'بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم.',
    source: 'ثلاث مرات · رواه الترمذي',
    target: 3,
  },
  {
    id: 'evening-7',
    category: 'evening',
    text: 'اللهم ما أمسى بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك، فلك الحمد ولك الشكر.',
    source: 'رواه أبو داود',
    target: 1,
  },
  {
    id: 'prayer-1',
    category: 'prayer',
    text: 'أستغفر الله، أستغفر الله، أستغفر الله. اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام.',
    source: 'رواه مسلم',
    target: 1,
  },
  {
    id: 'prayer-2',
    category: 'prayer',
    text: 'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.',
    source: 'رواه البخاري ومسلم',
    target: 1,
  },
  {
    id: 'prayer-3',
    category: 'prayer',
    text: 'سبحان الله، والحمد لله، والله أكبر.',
    source: 'ثلاثاً وثلاثين مرة · رواه مسلم',
    target: 33,
  },
  {
    id: 'prayer-4',
    category: 'prayer',
    text: 'اللّهُ لا إلهَ إلاّ هوَ الحيُّ القيّومُ، لا تأخُذُهُ سِنةٌ ولا نومٌ، لهُ ما في السماواتِ وما في الأرضِ، وهوَ العليُّ العظيمُ.',
    source: 'آية الكرسي · بعد كل صلاة',
    target: 1,
  },
  {
    id: 'prayer-5',
    category: 'prayer',
    text: 'اللهم أعني على ذكرك وشكرك وحسن عبادتك.',
    source: 'رواه أبو داود والنسائي',
    target: 1,
  },
  {
    id: 'prayer-6',
    category: 'prayer',
    text: 'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، يحيي ويميت وهو على كل شيء قدير.',
    source: 'عشر مرات · رواه الترمذي',
    target: 10,
  },
  {
    id: 'sleep-1',
    category: 'sleep',
    text: 'باسمك اللهم أموت وأحيا.',
    source: 'رواه البخاري',
    target: 1,
  },
  {
    id: 'sleep-2',
    category: 'sleep',
    text: 'اللهم قني عذابك يوم تبعث عبادك.',
    source: 'ثلاث مرات · رواه أبو داود والترمذي',
    target: 3,
  },
  {
    id: 'sleep-3',
    category: 'sleep',
    text: 'اللّهُ لا إلهَ إلاّ هوَ الحيُّ القيّومُ، لا تأخُذُهُ سِنةٌ ولا نومٌ، لهُ ما في السماواتِ وما في الأرضِ، وهوَ العليُّ العظيمُ.',
    source: 'آية الكرسي · رواه البخاري',
    target: 1,
  },
  {
    id: 'sleep-4',
    category: 'sleep',
    text: 'سبحان الله، والحمد لله، والله أكبر.',
    source: 'ثلاثاً وثلاثين، وثلاثاً وثلاثين، وأربعاً وثلاثين · متفق عليه',
    target: 1,
  },
  {
    id: 'sleep-5',
    category: 'sleep',
    text: 'اللهم أسلمت نفسي إليك، ووجهت وجهي إليك، وفوضت أمري إليك، وألجأت ظهري إليك، رغبة ورهبة إليك، لا ملجأ ولا منجا منك إلا إليك.',
    source: 'رواه البخاري ومسلم',
    target: 1,
  },
  {
    id: 'travel-1',
    category: 'travel',
    text: 'سبحان الذي سخر لنا هذا وما كنا له مقرنين وإنا إلى ربنا لمنقلبون.',
    source: 'دعاء الركوب · رواه مسلم',
    target: 1,
  },
  {
    id: 'travel-2',
    category: 'travel',
    text: 'اللهم إنا نسألك في سفرنا هذا البر والتقوى، ومن العمل ما ترضى.',
    source: 'رواه مسلم',
    target: 1,
  },
  {
    id: 'travel-3',
    category: 'travel',
    text: 'اللهم أنت الصاحب في السفر، والخليفة في الأهل، اللهم اصحبنا بنصحك، واقلبنا بذمة.',
    source: 'رواه مسلم',
    target: 1,
  },
  {
    id: 'travel-4',
    category: 'travel',
    text: 'آيبون، تائبون، عابدون، لربنا حامدون.',
    source: 'عند الرجوع · رواه مسلم',
    target: 1,
  },
  {
    id: 'istighfar-1',
    category: 'istighfar',
    text: 'أستغفر الله وأتوب إليه.',
    source: 'مائة مرة · رواه البخاري ومسلم',
    target: 100,
  },
  {
    id: 'istighfar-2',
    category: 'istighfar',
    text: 'رب اغفر لي وتب عليّ، إنك أنت التواب الرحيم.',
    source: 'مائة مرة · رواه أبو داود والترمذي',
    target: 100,
  },
  {
    id: 'istighfar-3',
    category: 'istighfar',
    text: 'اللهم اغفر لي ذنبي كله، دقه وجله، وأوله وآخره، وعلانيته وسره.',
    source: 'رواه مسلم',
    target: 1,
  },
  {
    id: 'istighfar-4',
    category: 'istighfar',
    text: 'ربنا ظلمنا أنفسنا وإن لم تغفر لنا وترحمنا لنكونن من الخاسرين.',
    source: 'سورة الأعراف ٢٣',
    target: 1,
  },
  {
    id: 'duas-1',
    category: 'duas',
    text: 'ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.',
    source: 'سورة البقرة ٢٠١',
    target: 1,
  },
  {
    id: 'duas-2',
    category: 'duas',
    text: 'رب اشرح لي صدري ويسر لي أمري واحلل عقدة من لساني يفقهوا قولي.',
    source: 'سورة طه ٢٥–٢٨',
    target: 1,
  },
  {
    id: 'duas-3',
    category: 'duas',
    text: 'رب زدني علماً.',
    source: 'سورة طه ١١٤',
    target: 1,
  },
  {
    id: 'duas-4',
    category: 'duas',
    text: 'اللهم إني أعوذ بك من الهم والحزن، وأعوذ بك من العجز والكسل، وأعوذ بك من الجبن والبخل، وأعوذ بك من غلبة الدين وقهر الرجال.',
    source: 'رواه البخاري',
    target: 1,
  },
  {
    id: 'duas-5',
    category: 'duas',
    text: 'اللهم إني أسألك الهدى والتقى والعفاف والغنى.',
    source: 'رواه مسلم',
    target: 1,
  },
  {
    id: 'duas-6',
    category: 'duas',
    text: 'اللهم أصلح لي ديني الذي هو عصمة أمري، وأصلح لي دنياي التي فيها معاشي، وأصلح لي آخرتي التي فيها معادي.',
    source: 'رواه مسلم',
    target: 1,
  },
];

export function getCategory(slug: string | undefined) {
  return categories.find((category) => category.slug === slug) ?? categories[0];
}
