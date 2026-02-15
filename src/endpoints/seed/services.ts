export type ServiceSeedItem = {
  slug: string
  order: number
  title: string
  description: string
  imageKey: 'digital' | 'teknik' | 'analiz' | 'performance'
  intro: string
  focusPoints: string[]
  deliverables: string[]
  processFlow: Array<{
    title: string
    detail: string
  }>
}

export const servicesSeed: ServiceSeedItem[] = [
  {
    slug: 'mevcut-durum-analizi',
    order: 1,
    title: 'Mevcut Durum Analizi',
    description: 'Denetim ve keşif ile “Şu anda neredeyiz?” sorusu yanıtlanır',
    imageKey: 'digital',
    intro:
      'İşletmenin mevcut dijital altyapısını, süreçlerini ve ekip çalışma modelini objektif verilerle analiz ediyoruz. Amaç, sorunu tahmin etmek değil, somut olarak tespit etmek.',
    focusPoints: [
      'Mevcut araç ve platformların iş hedefleriyle uyumu',
      'Süreçlerdeki tekrar eden aksama ve verimsizlik alanları',
      'Ekiplerin rol, sorumluluk ve koordinasyon netliği',
      'Veri akışı, raporlama ve karar alma hızını etkileyen kırılımlar',
    ],
    deliverables: [
      'Dijital mevcut durum raporu',
      'Risk ve öncelik matrisi',
      'Kısa vadeli iyileştirme önerileri',
      'Yönetim için karar notu',
    ],
    processFlow: [
      {
        title: 'Keşif Görüşmeleri',
        detail:
          'Yönetim, operasyon ve uygulama tarafında mevcut akışı netleştiren görüşmeler yapılır.',
      },
      {
        title: 'Sistem ve Süreç Denetimi',
        detail:
          'Kullanılan dijital araçlar, veri akışı ve ekip etkileşim modeli birlikte değerlendirilir.',
      },
      {
        title: 'Tespit ve Raporlama',
        detail: 'Kritik bulgular önceliklendirilir ve uygulanabilir önerilerle raporlanır.',
      },
    ],
  },
  {
    slug: 'stratejik-planlama',
    order: 2,
    title: 'Stratejik Planlama',
    description: 'Yol haritası ile “Nereye gitmek istiyoruz?” netleştirilir',
    imageKey: 'teknik',
    intro:
      'İşletmenin hedefleriyle örtüşen, adım adım ilerlenebilir bir dijital strateji oluşturuyoruz. Böylece kaynaklar dağılmadan, doğru zamanda doğru yatırım yapılır.',
    focusPoints: [
      'Öncelik sıralaması ve etki/maliyet dengesi',
      'Departmanlar arası eşgüdüm gerektiren aksiyonlar',
      'Bütçe ve zaman planına uygun uygulama kurgusu',
      'KPI ve başarı ölçüm yapısının net tanımlanması',
    ],
    deliverables: [
      '90 günlük aksiyon planı',
      '12 aylık stratejik yol haritası',
      'KPI seti ve izleme çerçevesi',
      'Rol ve sorumluluk dağılım planı',
    ],
    processFlow: [
      {
        title: 'Hedef Netleştirme',
        detail:
          'İşletmenin büyüme, verimlilik ve müşteri deneyimi hedefleri birlikte netleştirilir.',
      },
      {
        title: 'Senaryo ve Öncelik Çalışması',
        detail:
          'Alternatif uygulama senaryoları değerlendirilir ve en doğru sıralama belirlenir.',
      },
      {
        title: 'Yol Haritası Tasarımı',
        detail:
          'Kısa, orta ve uzun vadeli aksiyonların bağlı olduğu net bir uygulama planı hazırlanır.',
      },
    ],
  },
  {
    slug: 'uygulama-ve-entegrasyon',
    order: 3,
    title: 'Uygulama ve Entegrasyon',
    description: 'Uygulama ekipleriyle süreç işletme hedeflerine uygun şekilde ilerler',
    imageKey: 'analiz',
    intro:
      'Planlanan stratejinin sahada doğru şekilde hayata geçmesi için uygulama ekipleriyle koordineli ilerliyoruz. Odak, iş hedefinden sapmadan sağlıklı teslimattır.',
    focusPoints: [
      'Ajans/yazılım ekipleriyle doğru brif ve kapsam yönetimi',
      'Zaman planı, bağımlılık ve teslim takviminin yönetimi',
      'Karar noktalarında işletme önceliklerinin korunması',
      'Teknik uygulamanın operasyonla uyumunun takibi',
    ],
    deliverables: [
      'Uygulama takip planı',
      'Haftalık ilerleme raporu',
      'Kritik karar noktası notları',
      'Canlıya geçiş kontrol listesi',
    ],
    processFlow: [
      {
        title: 'Uygulama Hazırlığı',
        detail: 'Kapsam, öncelik ve teslim beklentileri uygulama ekipleriyle netleştirilir.',
      },
      {
        title: 'Koordinasyon ve Takip',
        detail:
          'Toplantı ritmi, görev akışı ve bağımlılıklar yakından takip edilerek ilerlenir.',
      },
      {
        title: 'Canlıya Geçiş ve Stabilizasyon',
        detail: 'Devreye alma sonrası süreç performansı izlenir ve gerekli düzeltmeler planlanır.',
      },
    ],
  },
  {
    slug: 'performans-izleme-ve-optimizasyon',
    order: 4,
    title: 'Performans İzleme ve Optimizasyon',
    description: 'Süreç düzenli izlenir, değerlendirilir ve gerektiğinde güncellenir',
    imageKey: 'performance',
    intro:
      'Kurulan yapıların zaman içinde ne kadar sonuç ürettiğini takip ediyoruz. Ölçüm, öğrenme ve iyileştirme döngüsüyle süreci canlı ve sürdürülebilir tutuyoruz.',
    focusPoints: [
      'Belirlenen KPI metriklerinin düzenli takibi',
      'Süreçte sapma yaratan nedenlerin analizi',
      'Veriye dayalı iyileştirme kararlarının alınması',
      'Yeni ihtiyaçlara göre plan güncelleme çevikliği',
    ],
    deliverables: [
      'Aylık performans değerlendirme raporu',
      'Optimizasyon öneri listesi',
      'KPI trend analizi',
      'Güncellenmiş aksiyon planı',
    ],
    processFlow: [
      {
        title: 'Ölçüm ve İzleme',
        detail: 'KPI dashboardları ve düzenli raporlarla performans görünürlüğü sağlanır.',
      },
      {
        title: 'Analiz ve Teşhis',
        detail: 'Beklenen-sonuç farkı analiz edilerek iyileştirme alanları netleştirilir.',
      },
      {
        title: 'Optimizasyon Uygulaması',
        detail:
          'Belirlenen geliştirmeler devreye alınır ve etkisi tekrar ölçülerek döngü tamamlanır.',
      },
    ],
  },
]

export const serviceImagesSeed = {
  analiz: {
    alt: 'Uygulama ve entegrasyon hizmet görseli',
    filePath: 'src/assets/analiz.png',
  },
  digital: {
    alt: 'Mevcut durum analizi hizmet görseli',
    filePath: 'src/assets/digital.png',
  },
  performance: {
    alt: 'Performans izleme ve optimizasyon hizmet görseli',
    filePath: 'src/assets/performance.png',
  },
  teknik: {
    alt: 'Stratejik planlama hizmet görseli',
    filePath: 'src/assets/teknik.png',
  },
} as const
