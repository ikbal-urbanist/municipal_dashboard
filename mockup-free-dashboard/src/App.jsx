import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FileBarChart,
  Filter,
  Home,
  Layers,
  LayoutDashboard,
  Lock,
  Map,
  MapPin,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UserRound,
  X,
} from 'lucide-react'
import './App.css'

const FREE_STATUSES = ['Alındı', 'İşlemde', 'Çözüldü']

const initialComplaints = [
  {
    id: 'SK-1048',
    title: 'Kaldırımda çökme ve yaya güvenliği riski',
    source: 'Senin Kentin',
    category: 'Yol ve Kaldırım',
    district: 'Konak',
    neighborhood: 'Alsancak',
    status: 'Alındı',
    createdAt: 'Bugün 09:42',
    location: 'Talatpaşa Bulvarı no: 18 yakını',
    x: 34,
    y: 38,
    photoTone: 'road',
    publicResponse:
      'Başvurunuz alınmıştır. İlgili ekipler ön inceleme için yönlendirilecektir.',
    visibility:
      'Bu kayıt vatandaş uygulamasından geldiği için kamusal görünürlük platform yöneticisi tarafından kontrol edilir.',
    activity: ['Vatandaş kaydı oluşturdu', 'Belediye paneline aktarıldı'],
  },
  {
    id: 'SK-1047',
    title: 'Park aydınlatması çalışmıyor',
    source: 'Senin Kentin',
    category: 'Aydınlatma',
    district: 'Karşıyaka',
    neighborhood: 'Bostanlı',
    status: 'İşlemde',
    createdAt: 'Bugün 08:15',
    location: 'Bostanlı Sahil Parkı çocuk alanı',
    x: 59,
    y: 28,
    photoTone: 'light',
    publicResponse:
      'Elektrik bakım birimi bilgilendirildi. Ekip kontrolü devam ediyor.',
    visibility:
      'Bu kayıt vatandaş uygulamasından geldiği için kamusal görünürlük platform yöneticisi tarafından kontrol edilir.',
    activity: ['Vatandaş kaydı oluşturdu', 'Durum İşlemde olarak güncellendi'],
  },
  {
    id: 'BI-220',
    title: 'Saha ekibinden gelen rögar kapağı bildirimi',
    source: 'Belediye İç Kaydı',
    category: 'Altyapı',
    district: 'Bornova',
    neighborhood: 'Kazımdirik',
    status: 'Çözüldü',
    createdAt: 'Dün 16:20',
    location: 'Üniversite Caddesi servis yolu',
    x: 73,
    y: 58,
    photoTone: 'utility',
    publicResponse:
      'Saha ekibi kapağı sabitledi. Kayıt çözüldü olarak işaretlendi.',
    visibility:
      'Belediye iç kayıtları Free planda yalnızca kurum içinde görünür. Çözülen iç kayıtları kamu haritasında yayınlama Pro özelliğidir.',
    activity: ['İç kayıt oluşturuldu', 'Durum Çözüldü olarak güncellendi'],
  },
  {
    id: 'SK-1046',
    title: 'Yağmur sonrası biriken su geçişi engelliyor',
    source: 'Senin Kentin',
    category: 'Su Birikintisi',
    district: 'Buca',
    neighborhood: 'Adatepe',
    status: 'Alındı',
    createdAt: 'Dün 11:04',
    location: 'Adatepe Mahallesi 12. Sokak',
    x: 43,
    y: 69,
    photoTone: 'water',
    publicResponse: '',
    visibility:
      'Bu kayıt vatandaş uygulamasından geldiği için kamusal görünürlük platform yöneticisi tarafından kontrol edilir.',
    activity: ['Vatandaş kaydı oluşturdu'],
  },
  {
    id: 'SK-1045',
    title: 'Boş arazi kenarında atık birikimi',
    source: 'Senin Kentin',
    category: 'Temizlik',
    district: 'Karabağlar',
    neighborhood: 'Yeşilyurt',
    status: 'Çözüldü',
    createdAt: '2 gün önce',
    location: 'Yeşilyurt pazar yeri arkası',
    x: 24,
    y: 66,
    photoTone: 'clean',
    publicResponse:
      'Temizlik ekipleri alanda çalışma yaptı. Kayıt çözüldü olarak kapatıldı.',
    visibility:
      'Bu kayıt vatandaş uygulamasından geldiği için kamusal görünürlük platform yöneticisi tarafından kontrol edilir.',
    activity: ['Vatandaş kaydı oluşturdu', 'Durum İşlemde olarak güncellendi', 'Durum Çözüldü olarak güncellendi'],
  },
  {
    id: 'BI-219',
    title: 'Zabıta saha turunda tespit edilen tabela riski',
    source: 'Belediye İç Kaydı',
    category: 'Güvenlik',
    district: 'Konak',
    neighborhood: 'Kemeraltı',
    status: 'İşlemde',
    createdAt: '3 gün önce',
    location: 'Anafartalar Caddesi giriş aksı',
    x: 31,
    y: 48,
    photoTone: 'safety',
    publicResponse:
      'İç kayıt belediye operasyon sürecinde takip edilmektedir.',
    visibility:
      'Belediye iç kayıtları Free planda yalnızca kurum içinde görünür. Çözülen iç kayıtları kamu haritasında yayınlama Pro özelliğidir.',
    activity: ['İç kayıt oluşturuldu', 'Durum İşlemde olarak güncellendi'],
  },
]

const lockedPages = {
  kanban: {
    icon: LayoutDashboard,
    title: 'Kanban iş akışı Pro özelliğidir',
    body: 'Şikayetleri Alındı, Atandı, İşlemde ve Çözüldü sütunlarında sürükle-bırak ile yönetmek için Pro plana geçin.',
  },
  analytics: {
    icon: BarChart3,
    title: 'Gelişmiş analitik Pro özelliğidir',
    body: 'Mahalle kırılımı, sıcak nokta haritası, kategori yükü ve hizmet performansı analizleri Pro planda açılır.',
  },
  departments: {
    icon: Building2,
    title: 'Birim ve alt birim yönetimi Pro özelliğidir',
    body: 'Departman, alt birim, ilçe yönlendirme ve sorumluluk atama kontrolleri Pro planda kullanılabilir.',
  },
  sla: {
    icon: TimerReset,
    title: 'SLA ve öncelik yönetimi Pro özelliğidir',
    body: 'Geciken kayıtları, riskli işleri ve belediye tarafından tanımlanan süre hedeflerini takip etmek için Pro gerekir.',
  },
  internal: {
    icon: Plus,
    title: 'Belediye iç kaydı oluşturma Pro özelliğidir',
    body: 'Saha ekiplerinden, çağrı merkezinden veya kurum içi süreçlerden gelen kayıtları panele eklemek için Pro plana geçin.',
  },
}

const navItems = [
  { key: 'home', label: 'Genel Bakış', icon: Home, locked: false },
  { key: 'complaints', label: 'Şikayetler', icon: ClipboardList, locked: false },
  { key: 'map', label: 'Harita', icon: Map, locked: false },
  { key: 'reports', label: 'Raporlar', icon: FileBarChart, locked: false },
  { key: 'kanban', label: 'Kanban', icon: LayoutDashboard, locked: true },
  { key: 'analytics', label: 'Analitik', icon: BarChart3, locked: true },
  { key: 'departments', label: 'Birimler', icon: Building2, locked: true },
  { key: 'sla', label: 'SLA / Öncelik', icon: TimerReset, locked: true },
  { key: 'internal', label: 'İç Kayıt Oluştur', icon: Plus, locked: true },
]

const statusClass = {
  Alındı: 'status-received',
  İşlemde: 'status-progress',
  Çözüldü: 'status-resolved',
}

function App() {
  const [activeView, setActiveView] = useState('home')
  const [complaints, setComplaints] = useState(initialComplaints)
  const [selectedId, setSelectedId] = useState(initialComplaints[0].id)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Tümü')
  const [sourceFilter, setSourceFilter] = useState('Tümü')
  const [upgradeModal, setUpgradeModal] = useState(null)

  const selectedComplaint = complaints.find((item) => item.id === selectedId)

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const searchText = `${complaint.id} ${complaint.title} ${complaint.category} ${complaint.district} ${complaint.neighborhood}`.toLocaleLowerCase('tr-TR')
      const matchesSearch = searchText.includes(search.toLocaleLowerCase('tr-TR'))
      const matchesStatus = statusFilter === 'Tümü' || complaint.status === statusFilter
      const matchesSource = sourceFilter === 'Tümü' || complaint.source === sourceFilter
      return matchesSearch && matchesStatus && matchesSource
    })
  }, [complaints, search, sourceFilter, statusFilter])

  const metrics = useMemo(() => {
    const open = complaints.filter((item) => item.status !== 'Çözüldü').length
    const resolved = complaints.filter((item) => item.status === 'Çözüldü').length
    const today = complaints.filter((item) => item.createdAt.includes('Bugün')).length
    const internal = complaints.filter((item) => item.source === 'Belediye İç Kaydı').length
    return { total: complaints.length, open, resolved, today, internal }
  }, [complaints])

  const openLocked = (key) => {
    setActiveView(key)
    setUpgradeModal(key)
  }

  const updateStatus = (id, status) => {
    setComplaints((current) =>
      current.map((complaint) =>
        complaint.id === id
          ? {
              ...complaint,
              status,
              activity: [`Durum ${status} olarak güncellendi`, ...complaint.activity],
            }
          : complaint,
      ),
    )
  }

  const saveResponse = (id, publicResponse) => {
    setComplaints((current) =>
      current.map((complaint) =>
        complaint.id === id
          ? {
              ...complaint,
              publicResponse,
              activity: ['Kamusal yanıt güncellendi', ...complaint.activity],
            }
          : complaint,
      ),
    )
  }

  const selectComplaint = (id, view = activeView) => {
    setSelectedId(id)
    if (view !== activeView) setActiveView(view)
  }

  const CurrentLockedIcon = lockedPages[activeView]?.icon || Lock

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">SK</div>
          <div>
            <strong>Senin Kentin</strong>
            <span>Belediye Paneli</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="Ana menü">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.key
            return (
              <button
                key={item.key}
                type="button"
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => (item.locked ? openLocked(item.key) : setActiveView(item.key))}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.locked && <Lock size={14} className="nav-lock" />}
              </button>
            )
          })}
        </nav>

        <div className="sidebar-card">
          <div className="plan-row">
            <ShieldCheck size={18} />
            <span>Free Plan</span>
          </div>
          <p>Temel şikayet takibi aktif. Pro modüller kilitli olarak görünür.</p>
          <button type="button" className="secondary-button" onClick={() => setUpgradeModal('upgrade')}>
            Pro için iletişime geç
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div>
            <p className="eyebrow">Demo Büyükşehir Belediyesi</p>
            <h1>{getViewTitle(activeView)}</h1>
          </div>
          <div className="topbar-actions">
            <button type="button" className="icon-button" aria-label="Bildirimler">
              <Bell size={18} />
              <span className="notification-dot" />
            </button>
            <button type="button" className="user-chip">
              <UserRound size={18} />
              Operatör
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        {activeView === 'home' && (
          <HomeView
            metrics={metrics}
            complaints={complaints}
            onSelectComplaint={(id) => selectComplaint(id, 'complaints')}
            onLocked={setUpgradeModal}
          />
        )}

        {activeView === 'complaints' && (
          <ComplaintsView
            complaints={filteredComplaints}
            search={search}
            statusFilter={statusFilter}
            sourceFilter={sourceFilter}
            setSearch={setSearch}
            setStatusFilter={setStatusFilter}
            setSourceFilter={setSourceFilter}
            selectedId={selectedId}
            onSelectComplaint={(id) => selectComplaint(id)}
            onLocked={setUpgradeModal}
          />
        )}

        {activeView === 'map' && (
          <MapView
            complaints={filteredComplaints}
            selectedId={selectedId}
            onSelectComplaint={(id) => selectComplaint(id)}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sourceFilter={sourceFilter}
            setSourceFilter={setSourceFilter}
            onLocked={setUpgradeModal}
          />
        )}

        {activeView === 'reports' && (
          <ReportsView metrics={metrics} complaints={complaints} onLocked={setUpgradeModal} />
        )}

        {lockedPages[activeView] && (
          <LockedPage
            icon={CurrentLockedIcon}
            title={lockedPages[activeView].title}
            body={lockedPages[activeView].body}
            onUpgrade={() => setUpgradeModal(activeView)}
          />
        )}
      </main>

      {(activeView === 'complaints' || activeView === 'map') && selectedComplaint && (
        <ComplaintDrawer
          key={selectedComplaint.id}
          complaint={selectedComplaint}
          onClose={() => setSelectedId(null)}
          onUpdateStatus={updateStatus}
          onSaveResponse={saveResponse}
          onLocked={setUpgradeModal}
        />
      )}

      {upgradeModal && (
        <UpgradeModal
          lockedKey={upgradeModal}
          onClose={() => setUpgradeModal(null)}
        />
      )}
    </div>
  )
}

function getViewTitle(view) {
  const titles = {
    home: 'Genel Bakış',
    complaints: 'Şikayetler',
    map: 'Harita Görünümü',
    reports: 'Temel Raporlar',
    kanban: 'Kanban',
    analytics: 'Analitik',
    departments: 'Birimler',
    sla: 'SLA / Öncelik',
    internal: 'İç Kayıt Oluştur',
  }
  return titles[view] || 'Belediye Paneli'
}

function HomeView({ metrics, complaints, onSelectComplaint, onLocked }) {
  return (
    <div className="content-stack">
      <section className="metric-grid">
        <MetricCard label="Toplam kayıt" value={metrics.total} icon={ClipboardList} tone="blue" />
        <MetricCard label="Bugün gelen" value={metrics.today} icon={Bell} tone="green" />
        <MetricCard label="Açık kayıt" value={metrics.open} icon={AlertTriangle} tone="amber" />
        <MetricCard label="Çözülen" value={metrics.resolved} icon={CheckCircle2} tone="teal" />
      </section>

      <section className="dashboard-grid">
        <div className="panel wide-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Operasyon özeti</p>
              <h2>Free plan iş yükü</h2>
            </div>
            <span className="pill">Canlı mock veri</span>
          </div>
          <div className="trend-chart" aria-label="Şikayet trendi">
            {[36, 58, 42, 74, 64, 88, 70].map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="chart-legend">
            <span>Son 7 gün</span>
            <strong>+18% yeni kayıt</strong>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Kaynak</p>
              <h2>Kayıt dağılımı</h2>
            </div>
          </div>
          <div className="source-stack">
            <SourceBar label="Senin Kentin" value={metrics.total - metrics.internal} total={metrics.total} />
            <SourceBar label="Belediye İç Kaydı" value={metrics.internal} total={metrics.total} />
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Son hareketler</p>
              <h2>Güncel kayıtlar</h2>
            </div>
          </div>
          <div className="activity-list">
            {complaints.slice(0, 4).map((complaint) => (
              <button
                key={complaint.id}
                type="button"
                className="activity-item"
                onClick={() => onSelectComplaint(complaint.id)}
              >
                <span className={`status-dot ${statusClass[complaint.status]}`} />
                <div>
                  <strong>{complaint.title}</strong>
                  <span>{complaint.id} · {complaint.district} · {complaint.status}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <LockedWidget
          title="Pro operasyon göstergeleri"
          body="Atanmamış işler, birim yükü, SLA riski ve sıcak nokta özeti Pro planda açılır."
          onLocked={() => onLocked('analytics')}
        />
      </section>
    </div>
  )
}

function ComplaintsView({
  complaints,
  search,
  statusFilter,
  sourceFilter,
  setSearch,
  setStatusFilter,
  setSourceFilter,
  selectedId,
  onSelectComplaint,
  onLocked,
}) {
  return (
    <div className="content-stack">
      <FilterBar
        search={search}
        statusFilter={statusFilter}
        sourceFilter={sourceFilter}
        setSearch={setSearch}
        setStatusFilter={setStatusFilter}
        setSourceFilter={setSourceFilter}
        onLocked={onLocked}
      />

      <section className="panel table-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Şikayet listesi</p>
            <h2>{complaints.length} kayıt görüntüleniyor</h2>
          </div>
          <button type="button" className="locked-button" onClick={() => onLocked('internal')}>
            <Lock size={15} />
            İç kayıt oluştur
          </button>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Kayıt</th>
                <th>Kaynak</th>
                <th>Kategori</th>
                <th>Konum</th>
                <th>Durum</th>
                <th className="locked-column">Birim</th>
                <th className="locked-column">SLA</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr
                  key={complaint.id}
                  className={selectedId === complaint.id ? 'selected-row' : ''}
                  onClick={() => onSelectComplaint(complaint.id)}
                >
                  <td>
                    <strong>{complaint.id}</strong>
                    <span>{complaint.title}</span>
                  </td>
                  <td><SourceBadge source={complaint.source} /></td>
                  <td>{complaint.category}</td>
                  <td>
                    <strong>{complaint.district}</strong>
                    <span>{complaint.neighborhood}</span>
                  </td>
                  <td><StatusBadge status={complaint.status} /></td>
                  <td className="locked-column"><Lock size={14} /> Pro</td>
                  <td className="locked-column"><Lock size={14} /> Pro</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function MapView({
  complaints,
  selectedId,
  onSelectComplaint,
  statusFilter,
  setStatusFilter,
  sourceFilter,
  setSourceFilter,
  onLocked,
}) {
  const selected = complaints.find((complaint) => complaint.id === selectedId) || complaints[0]

  return (
    <div className="map-layout">
      <section className="panel map-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Mekansal görünüm</p>
            <h2>Belediye sınırı içindeki kayıtlar</h2>
          </div>
          <button type="button" className="locked-button" onClick={() => onLocked('analytics')}>
            <Layers size={15} />
            Sıcak nokta katmanı
            <Lock size={14} />
          </button>
        </div>

        <div className="map-filter-row">
          <SegmentedControl
            label="Durum"
            value={statusFilter}
            options={['Tümü', ...FREE_STATUSES]}
            onChange={setStatusFilter}
          />
          <SegmentedControl
            label="Kaynak"
            value={sourceFilter}
            options={['Tümü', 'Senin Kentin', 'Belediye İç Kaydı']}
            onChange={setSourceFilter}
          />
        </div>

        <div className="mock-map">
          <div className="map-road road-a" />
          <div className="map-road road-b" />
          <div className="map-road road-c" />
          <div className="district-label label-a">Konak</div>
          <div className="district-label label-b">Karşıyaka</div>
          <div className="district-label label-c">Bornova</div>
          {complaints.map((complaint) => (
            <button
              key={complaint.id}
              type="button"
              className={`map-marker ${statusClass[complaint.status]} ${selectedId === complaint.id ? 'active' : ''}`}
              style={{ left: `${complaint.x}%`, top: `${complaint.y}%` }}
              onClick={() => onSelectComplaint(complaint.id)}
              aria-label={`${complaint.id} ${complaint.title}`}
            >
              <MapPin size={17} />
            </button>
          ))}
        </div>
      </section>

      <aside className="panel map-summary">
        <p className="eyebrow">Seçili kayıt</p>
        {selected ? (
          <>
            <h2>{selected.title}</h2>
            <div className="summary-meta">
              <SourceBadge source={selected.source} />
              <StatusBadge status={selected.status} />
            </div>
            <p>{selected.location}</p>
            <button type="button" className="primary-button" onClick={() => onSelectComplaint(selected.id)}>
              Detayı aç
            </button>
          </>
        ) : (
          <p>Filtrelere uyan kayıt yok.</p>
        )}
      </aside>
    </div>
  )
}

function ReportsView({ metrics, complaints, onLocked }) {
  const statusCounts = FREE_STATUSES.map((status) => ({
    status,
    value: complaints.filter((complaint) => complaint.status === status).length,
  }))

  return (
    <div className="content-stack">
      <section className="report-grid">
        <MetricCard label="Toplam kayıt" value={metrics.total} icon={ClipboardList} tone="blue" />
        <MetricCard label="Açık kayıt" value={metrics.open} icon={AlertTriangle} tone="amber" />
        <MetricCard label="Çözüm oranı" value={`${Math.round((metrics.resolved / metrics.total) * 100)}%`} icon={CheckCircle2} tone="teal" />
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Durum raporu</p>
              <h2>Free plan özeti</h2>
            </div>
            <select className="select-input" defaultValue="Bu hafta">
              <option>Bugün</option>
              <option>Bu hafta</option>
              <option>Bu ay</option>
              <option>Son 3 ay</option>
            </select>
          </div>
          <div className="source-stack">
            {statusCounts.map((item) => (
              <SourceBar key={item.status} label={item.status} value={item.value} total={metrics.total} />
            ))}
          </div>
        </div>

        <LockedWidget
          title="Excel dışa aktarma kilitli"
          body="Rapor çıktıları ve gelişmiş performans kırılımları Pro sürümünün sonraki aşamasında açılır."
          onLocked={() => onLocked('analytics')}
        />
      </section>
    </div>
  )
}

function FilterBar({
  search,
  statusFilter,
  sourceFilter,
  setSearch,
  setStatusFilter,
  setSourceFilter,
  onLocked,
}) {
  return (
    <section className="filter-bar">
      <label className="search-field">
        <Search size={17} />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Kayıt no, mahalle veya kategori ara"
        />
      </label>
      <SegmentedControl
        label="Durum"
        value={statusFilter}
        options={['Tümü', ...FREE_STATUSES]}
        onChange={setStatusFilter}
      />
      <SegmentedControl
        label="Kaynak"
        value={sourceFilter}
        options={['Tümü', 'Senin Kentin', 'Belediye İç Kaydı']}
        onChange={setSourceFilter}
      />
      <button type="button" className="locked-button" onClick={() => onLocked('departments')}>
        <Filter size={15} />
        Birim filtresi
        <Lock size={14} />
      </button>
    </section>
  )
}

function SegmentedControl({ label, value, options, onChange }) {
  return (
    <div className="segmented-group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={value === option ? 'active' : ''}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

function ComplaintDrawer({ complaint, onClose, onUpdateStatus, onSaveResponse, onLocked }) {
  const [responseDraft, setResponseDraft] = useState(complaint.publicResponse)

  return (
    <aside className="drawer" aria-label="Şikayet detayı">
      <div className="drawer-header">
        <div>
          <p className="eyebrow">{complaint.id}</p>
          <h2>{complaint.title}</h2>
        </div>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Detayı kapat">
          <X size={18} />
        </button>
      </div>

      <div className={`photo-placeholder ${complaint.photoTone}`}>
        <MapPin size={24} />
        <span>{complaint.location}</span>
      </div>

      <div className="detail-meta">
        <SourceBadge source={complaint.source} />
        <StatusBadge status={complaint.status} />
        <span>{complaint.createdAt}</span>
      </div>

      <section className="drawer-section">
        <h3>Temel bilgiler</h3>
        <dl className="detail-list">
          <div><dt>Kategori</dt><dd>{complaint.category}</dd></div>
          <div><dt>İlçe</dt><dd>{complaint.district}</dd></div>
          <div><dt>Mahalle</dt><dd>{complaint.neighborhood}</dd></div>
        </dl>
      </section>

      <section className="drawer-section">
        <h3>Durum güncelle</h3>
        <div className="status-actions">
          {FREE_STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              className={complaint.status === status ? 'active' : ''}
              onClick={() => onUpdateStatus(complaint.id, status)}
            >
              {status}
            </button>
          ))}
        </div>
      </section>

      <section className="drawer-section notice-box">
        <ShieldCheck size={18} />
        <p>{complaint.visibility}</p>
      </section>

      <section className="drawer-section">
        <h3>Kamusal yanıt</h3>
        <textarea
          value={responseDraft}
          onChange={(event) => setResponseDraft(event.target.value)}
          rows={4}
          placeholder="Vatandaşa görünecek kısa süreç bilgisini yazın."
        />
        <button
          type="button"
          className="primary-button"
          onClick={() => onSaveResponse(complaint.id, responseDraft)}
        >
          <Send size={16} />
          Yanıtı kaydet
        </button>
      </section>

      <section className="drawer-section locked-module">
        <div>
          <Lock size={17} />
          <strong>Birim atama, iç notlar ve SLA Pro ile açılır</strong>
        </div>
        <button type="button" className="text-button" onClick={() => onLocked('departments')}>
          Detayları gör
        </button>
      </section>

      <section className="drawer-section">
        <h3>Hareket geçmişi</h3>
        <ul className="timeline">
          {complaint.activity.map((event, index) => (
            <li key={`${event}-${index}`}>{event}</li>
          ))}
        </ul>
      </section>
    </aside>
  )
}

function LockedPage({ icon: Icon, title, body, onUpgrade }) {
  return (
    <section className="locked-page">
      <div className="locked-icon">
        <Icon size={34} />
        <Lock size={18} />
      </div>
      <p className="eyebrow">Free planda kilitli</p>
      <h2>{title}</h2>
      <p>{body}</p>
      <button type="button" className="primary-button" onClick={onUpgrade}>
        Pro için iletişime geç
      </button>
    </section>
  )
}

function UpgradeModal({ lockedKey, onClose }) {
  const locked = lockedPages[lockedKey]
  const title = locked?.title || 'Pro plan hakkında bilgi alın'

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="upgrade-title">
      <div className="modal-card">
        <button type="button" className="icon-button modal-close" onClick={onClose} aria-label="Modalı kapat">
          <X size={18} />
        </button>
        <div className="modal-icon">
          <Sparkles size={24} />
        </div>
        <h2 id="upgrade-title">{title}</h2>
        <p>
          Demo Büyükşehir Belediyesi için Pro plan görüşmesi talep edin. Bu mock-up formu veri göndermez.
        </p>
        <div className="modal-form">
          <input value="belediye@demo.gov.tr" readOnly />
          <textarea value="Kanban, analitik ve birim yönetimi için Pro plan hakkında bilgi almak istiyoruz." readOnly rows={3} />
          <button type="button" className="primary-button" onClick={onClose}>
            Talep taslağını kapat
          </button>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, icon: Icon, tone }) {
  return (
    <article className={`metric-card ${tone}`}>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <Icon size={22} />
    </article>
  )
}

function SourceBar({ label, value, total }) {
  const width = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div className="source-bar">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="bar-track">
        <span style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}

function LockedWidget({ title, body, onLocked }) {
  return (
    <div className="panel locked-widget">
      <div className="locked-widget-icon">
        <Lock size={18} />
      </div>
      <h2>{title}</h2>
      <p>{body}</p>
      <button type="button" className="secondary-button" onClick={onLocked}>
        Pro iletişim formu
      </button>
    </div>
  )
}

function SourceBadge({ source }) {
  return <span className={`source-badge ${source === 'Senin Kentin' ? 'citizen' : 'internal'}`}>{source}</span>
}

function StatusBadge({ status }) {
  return <span className={`status-badge ${statusClass[status]}`}>{status}</span>
}

export default App
