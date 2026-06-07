import { useMemo, useState } from 'react'
import './App.css'

const complaints = [
  {
    id: 'SK-2048',
    source: 'Senin Kentin',
    type: 'Şikayet',
    title: 'Kaldırımda çökme ve yaya güvenliği riski',
    category: 'Yol ve Kaldırım',
    location: 'Alsancak · Talatpaşa Blv. No:18',
    neighborhood: 'Alsancak',
    stage: 'Received',
    status: 'Alındı',
    owner: 'Atanmadı',
    department: 'Fen İşleri',
    priority: 'Yüksek',
    sla: 'Riskli',
    due: '12 saat kaldı',
    visibility: 'Public citizen record',
  },
  {
    id: 'SK-2047',
    source: 'Senin Kentin',
    type: 'Talep',
    title: 'Park aydınlatması çalışmıyor',
    category: 'Aydınlatma',
    location: 'Bostanlı · Sahil Parkı çocuk alanı',
    neighborhood: 'Bostanlı',
    stage: 'Assigned',
    status: 'Atandı',
    owner: 'Can Ergin',
    department: 'Park ve Bahçeler',
    priority: 'Normal',
    sla: 'Zamanında',
    due: '3 gün',
    visibility: 'Public citizen record',
  },
  {
    id: 'BI-320',
    source: 'Municipality Internal',
    type: 'İhbar',
    title: 'Saha ekibinden gelen rögar kapağı bildirimi',
    category: 'Altyapı',
    location: 'Kazımdirik · Üniversite Cd. servis yolu',
    neighborhood: 'Kazımdirik',
    stage: 'Resolved',
    status: 'Çözüldü',
    owner: 'Deniz Uçar',
    department: 'Fen İşleri',
    priority: 'Yüksek',
    sla: 'Zamanında',
    due: 'Kapandı',
    visibility: 'Internal only',
  },
  {
    id: 'SK-2046',
    source: 'Senin Kentin',
    type: 'Şikayet',
    title: 'Yağmur sonrası biriken su geçişi engelliyor',
    category: 'Su Birikintisi',
    location: 'Adatepe · 12. Sokak',
    neighborhood: 'Adatepe',
    stage: 'In Progress',
    status: 'İşlemde',
    owner: 'Ece Arslan',
    department: 'Fen İşleri',
    priority: 'Acil',
    sla: 'Gecikti',
    due: '2 gün geçti',
    visibility: 'Public citizen record',
  },
  {
    id: 'BI-319',
    source: 'Municipality Internal',
    type: 'İhbar',
    title: 'Zabıta saha turunda tespit edilen tabela riski',
    category: 'Güvenlik',
    location: 'Kemeraltı · Anafartalar Cd. giriş aksı',
    neighborhood: 'Kemeraltı',
    stage: 'In Progress',
    status: 'İşlemde',
    owner: 'Zeynep Koç',
    department: 'Zabıta + Fen İşleri',
    priority: 'Yüksek',
    sla: 'Riskli',
    due: '1 gün kaldı',
    visibility: 'Internal only',
  },
]

const stages = ['Received', 'Assigned', 'In Progress', 'Resolved', 'Closed']

const frames = [
  { key: 'login', label: '01 Login', edition: 'Shared' },
  { key: 'free-home', label: '02 Free Home', edition: 'Free' },
  { key: 'free-list', label: '03 Free Complaints', edition: 'Free' },
  { key: 'free-detail', label: '04 Free Detail', edition: 'Free' },
  { key: 'free-map', label: '05 Free Map', edition: 'Free' },
  { key: 'pro-home', label: '06 Pro Operations Home', edition: 'Pro' },
  { key: 'pro-list', label: '07 Pro Complaints', edition: 'Pro' },
  { key: 'pro-detail', label: '08 Pro Case File', edition: 'Pro' },
  { key: 'kanban', label: '09 Pro Kanban', edition: 'Pro' },
  { key: 'internal', label: '10 Internal Intake', edition: 'Pro' },
  { key: 'performance', label: '11 Performance', edition: 'Pro' },
  { key: 'spatial', label: '12 Spatial Intelligence', edition: 'Pro' },
  { key: 'departments', label: '13 Departments', edition: 'Pro' },
  { key: 'settings', label: '14 Settings + Entitlements', edition: 'Shared' },
  { key: 'all', label: 'All Frames Canvas', edition: 'Figma' },
]

const kpis = [
  ['Yeni kayıt', '42', '+12 bugün'],
  ['Açık iş', '186', '31 riskli'],
  ['Çözüm oranı', '%72', 'son 30 gün'],
  ['İç kayıt', '18', '6 saha kaynaklı'],
]

const departments = [
  ['Fen İşleri', 64, 12, 'Riskli'],
  ['Temizlik İşleri', 38, 4, 'İyi'],
  ['Park ve Bahçeler', 29, 5, 'İyi'],
  ['Zabıta', 21, 7, 'Riskli'],
]

function App() {
  const [activeFrame, setActiveFrame] = useState('all')
  const active = frames.find((frame) => frame.key === activeFrame) || frames[0]
  const visibleFrames = activeFrame === 'all' ? frames.filter((frame) => frame.key !== 'all') : [active]

  return (
    <div className="prototype-shell">
      <aside className="frame-sidebar">
        <div className="brand">
          <div className="brand-mark">SK</div>
          <div>
            <strong>Senin Kentin</strong>
            <span>Municipality UI frames</span>
          </div>
        </div>
        <div className="frame-list">
          {frames.map((frame) => (
            <button
              className={`frame-nav ${activeFrame === frame.key ? 'active' : ''}`}
              key={frame.key}
              onClick={() => setActiveFrame(frame.key)}
            >
              <span>{frame.label}</span>
              <small>{frame.edition}</small>
            </button>
          ))}
        </div>
        <div className="sidebar-note">
          <b>Figma import note</b>
          <p>Use All Frames mode for one long canvas, or import individual frames by selecting from this navigator.</p>
        </div>
      </aside>
      <main className="frame-stage">
        <div className="stage-header">
          <div>
            <p className="eyebrow">Frontend-only prototype · no backend</p>
            <h1>{active.label}</h1>
          </div>
          <div className="stage-actions">
            <span className="pill black">1440px desktop frames</span>
            <span className="pill">Ready for Figma reference</span>
          </div>
        </div>
        <div className={activeFrame === 'all' ? 'all-frames' : 'single-frame'}>
          {visibleFrames.map((frame) => (
            <section className="figma-frame" data-frame-name={frame.label} key={frame.key}>
              {activeFrame === 'all' && <FrameLabel frame={frame} />}
              <FrameRenderer frameKey={frame.key} />
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

function FrameLabel({ frame }) {
  return (
    <div className="frame-label">
      <span>{frame.label}</span>
      <small>{frame.edition}</small>
    </div>
  )
}

function FrameRenderer({ frameKey }) {
  const map = {
    login: <LoginFrame />,
    'free-home': <DashboardFrame edition="free" />,
    'free-list': <ComplaintListFrame edition="free" />,
    'free-detail': <DetailFrame edition="free" />,
    'free-map': <MapFrame edition="free" />,
    'pro-home': <DashboardFrame edition="pro" />,
    'pro-list': <ComplaintListFrame edition="pro" />,
    'pro-detail': <DetailFrame edition="pro" />,
    kanban: <KanbanFrame />,
    internal: <InternalIntakeFrame />,
    performance: <PerformanceFrame />,
    spatial: <SpatialFrame />,
    departments: <DepartmentsFrame />,
    settings: <SettingsFrame />,
  }
  return map[frameKey] || <DashboardFrame edition="pro" />
}

function ProductShell({ children, title, subtitle, edition = 'Pro', active = 'Home' }) {
  const nav = edition === 'Free'
    ? ['Home', 'Complaints', 'Map', 'Analytics 🔒', 'Kanban 🔒', 'Settings']
    : ['Home', 'Complaints', 'Kanban', 'Map', 'Internal Intake', 'Performance', 'Spatial', 'Departments', 'Settings']

  return (
    <div className="product-frame">
      <aside className="product-nav">
        <div className="city-lockup">
          <div className="city-seal">M</div>
          <div>
            <b>Maltepe Belediyesi</b>
            <span>{edition} workspace</span>
          </div>
        </div>
        <nav>
          {nav.map((item) => (
            <div className={`nav-row ${item.includes(active) ? 'selected' : ''}`} key={item}>
              <span className="nav-dot" />
              <span>{item}</span>
            </div>
          ))}
        </nav>
        {edition === 'Free' ? <LockedUpgrade /> : <ProOpsCard />}
      </aside>
      <div className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">{edition === 'Free' ? 'Free pilot' : 'Pro municipal operations'}</p>
            <h2>{title}</h2>
            <span>{subtitle}</span>
          </div>
          <div className="topbar-tools">
            <span className="risk-chip">31 riskli</span>
            <span className="user-chip">İkbal Öztekin · Admin</span>
          </div>
        </header>
        {children}
      </div>
    </div>
  )
}

function LoginFrame() {
  return (
    <div className="login-frame">
      <div className="login-trust">
        <div className="logo-orb">SK</div>
        <h2>Municipality dashboard for trusted civic response.</h2>
        <p>Queue, map, resolve and report citizen issues from one controlled municipal workspace.</p>
        <div className="trust-grid">
          <div><b>Tenant scoped</b><span>Every municipality isolated</span></div>
          <div><b>Audit ready</b><span>Status and notes preserved</span></div>
          <div><b>Pro upgrade path</b><span>Internal intake + SLA</span></div>
        </div>
      </div>
      <div className="login-card">
        <p className="eyebrow">Secure staff access</p>
        <h1>Sign in to Senin Kentin</h1>
        <label>Email</label>
        <input defaultValue="operator@maltepe.bel.tr" />
        <label>Password</label>
        <input type="password" defaultValue="municipality" />
        <button className="primary wide">Login to dashboard</button>
        <div className="form-foot"><span>Forgot password?</span><span>2FA ready</span></div>
      </div>
    </div>
  )
}

function DashboardFrame({ edition }) {
  const isPro = edition === 'pro'
  return (
    <ProductShell
      edition={isPro ? 'Pro' : 'Free'}
      active="Home"
      title={isPro ? 'Operations Home' : 'Home Dashboard'}
      subtitle={isPro ? 'Queue health, bottlenecks, internal records and routing risks.' : 'A simple queue-first pilot overview.'}
    >
      <div className="kpi-grid">
        {kpis.map(([label, value, hint]) => <MetricCard key={label} label={label} value={value} hint={hint} />)}
      </div>
      <div className="dashboard-grid">
        <Panel title={isPro ? 'Needs attention' : 'Today'} action="Open filtered list">
          <div className="attention-list">
            <AttentionItem title="Geciken kayıtlar" value="14" tone="late" />
            <AttentionItem title="Atanmamış işler" value="27" tone="warn" />
            <AttentionItem title="Yüksek öncelik" value="19" tone="hot" />
          </div>
        </Panel>
        <Panel title="Recent activity" action="View history">
          {complaints.slice(0, 4).map((c) => <ActivityRow key={c.id} item={`${c.id} · ${c.status}`} detail={c.title} />)}
        </Panel>
        <Panel title={isPro ? 'Department workload' : 'Open work trend'}>
          {isPro ? departments.map((d) => <WorkloadRow key={d[0]} row={d} />) : <MiniChart />}
        </Panel>
        <Panel title={isPro ? 'Stage distribution' : 'Pro preview'}>
          {isPro ? <StageDistribution /> : <LockedPreview />}
        </Panel>
      </div>
    </ProductShell>
  )
}

function ComplaintListFrame({ edition }) {
  const isPro = edition === 'pro'
  return (
    <ProductShell edition={isPro ? 'Pro' : 'Free'} active="Complaints" title={isPro ? 'Complaints + Internal Workload' : 'Complaints'} subtitle="Queue-first work surface with filters and case drill-down.">
      <div className="filter-bar">
        <input placeholder="Search ID, category, street, citizen note..." />
        {['Status', 'Source', 'District', isPro ? 'Department' : 'Category', isPro ? 'SLA risk' : 'Resolved'].map((filter) => <button className="filter-button" key={filter}>{filter}</button>)}
        {isPro && <button className="primary">+ Internal Intake</button>}
      </div>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Source</th><th>Type</th><th>Category</th><th>Stage</th>{isPro && <th>Owner</th>}<th>Location</th><th>SLA</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => <ComplaintRow complaint={c} isPro={isPro} key={c.id} />)}
          </tbody>
        </table>
      </div>
    </ProductShell>
  )
}

function ComplaintRow({ complaint, isPro }) {
  return (
    <tr>
      <td><b>{complaint.id}</b><span>{complaint.title}</span></td>
      <td><Badge tone={complaint.source.includes('Internal') ? 'internal' : 'public'}>{complaint.source}</Badge></td>
      <td>{complaint.type}</td>
      <td>{complaint.category}</td>
      <td><Badge>{complaint.stage}</Badge></td>
      {isPro && <td><b>{complaint.owner}</b><span>{complaint.department}</span></td>}
      <td>{complaint.location}</td>
      <td><Badge tone={complaint.sla === 'Gecikti' ? 'late' : complaint.sla === 'Riskli' ? 'warn' : 'ok'}>{complaint.sla}</Badge></td>
    </tr>
  )
}

function DetailFrame({ edition }) {
  const isPro = edition === 'pro'
  const c = complaints[isPro ? 4 : 0]
  return (
    <ProductShell edition={isPro ? 'Pro' : 'Free'} active="Complaints" title={isPro ? 'Advanced Case File' : 'Complaint Detail'} subtitle={`${c.id} · ${c.title}`}>
      <div className="detail-layout">
        <Panel title="Case overview" action={isPro ? 'Reassign' : 'Update status'}>
          <div className="case-title-row"><h3>{c.title}</h3><Badge tone={c.source.includes('Internal') ? 'internal' : 'public'}>{c.source}</Badge></div>
          <p className="body-copy">Structured case record showing status, location, visibility, owner and communication surfaces.</p>
          <div className="field-grid">
            <Field label="Record type" value={c.type} />
            <Field label="Stage" value={c.stage} />
            <Field label="Priority" value={c.priority} />
            <Field label="SLA" value={`${c.sla} · ${c.due}`} />
            <Field label="Location" value={c.location} />
            <Field label="Visibility" value={c.visibility} />
          </div>
        </Panel>
        <Panel title="Map + evidence">
          <MiniMap large />
          <div className="evidence-row"><div>Before photo</div><div>Street file</div><div>Resolution proof</div></div>
        </Panel>
        <Panel title={isPro ? 'Internal notes' : 'Status update'}>
          {isPro ? <NoteComposer /> : <FreeStatusBox />}
        </Panel>
        <Panel title="Timeline / audit">
          {['Kayıt oluşturuldu', 'Birim yönlendirmesi yapıldı', 'Saha notu eklendi', 'Durum güncellendi'].map((t, i) => <ActivityRow key={t} item={t} detail={`${i + 1} saat önce · sistem kaydı`} />)}
        </Panel>
      </div>
    </ProductShell>
  )
}

function MapFrame({ edition }) {
  const isPro = edition === 'pro'
  return (
    <ProductShell edition={isPro ? 'Pro' : 'Free'} active="Map" title={isPro ? 'Operational Map' : 'Complaint Map'} subtitle="Spatial overview of citizen and internal records.">
      <div className="map-layout">
        <div className="map-main"><MiniMap large pins /></div>
        <aside className="map-side">
          <h3>{isPro ? 'Hotspots + workload' : 'Selected area'}</h3>
          {complaints.slice(0, 4).map((c) => <MapListItem key={c.id} complaint={c} />)}
          {!isPro && <LockedPreview compact />}
        </aside>
      </div>
    </ProductShell>
  )
}

function KanbanFrame() {
  const grouped = useMemo(() => stages.map((stage) => [stage, complaints.filter((c) => c.stage === stage)]), [])
  return (
    <ProductShell edition="Pro" active="Kanban" title="Kanban Workflow" subtitle="Stage progression and bottleneck detection.">
      <div className="kanban-summary">
        <MetricCard label="Unassigned" value="27" hint="route now" />
        <MetricCard label="Overdue" value="14" hint="SLA breach" />
        <MetricCard label="In progress" value="51" hint="active field work" />
      </div>
      <div className="kanban-board">
        {grouped.map(([stage, items]) => (
          <div className="kanban-column" key={stage}>
            <div className="column-head"><b>{stage}</b><span>{items.length}</span></div>
            {items.length ? items.map((c) => <KanbanCard complaint={c} key={c.id} />) : <div className="empty-column">No cards</div>}
          </div>
        ))}
      </div>
    </ProductShell>
  )
}

function InternalIntakeFrame() {
  return (
    <ProductShell edition="Pro" active="Internal Intake" title="Internal Complaint Creation" subtitle="Maltepe-informed structured municipal case intake.">
      <div className="intake-grid">
        <Panel title="1 · Record type">
          <div className="segmented">{['Şikayet', 'İhbar', 'Talep', 'Bilgi', 'Öneri', 'Teşekkür'].map((x, i) => <button className={i === 1 ? 'selected' : ''} key={x}>{x}</button>)}</div>
        </Panel>
        <Panel title="2 · Source / reporter">
          <FormGrid fields={['Source channel: Saha ekibi', 'Reporter type: Staff', 'Name surname', 'Phone', 'Email', 'Privacy toggle']} />
        </Panel>
        <Panel title="3 · Structured address">
          <FormGrid fields={['District', 'Neighborhood / Mahalle', 'Street / Cadde Sokak', 'Exterior door no', 'Interior door no', 'Additional address']} />
        </Panel>
        <Panel title="4 · Case content + evidence">
          <FormGrid fields={['Subject', 'Category', 'Description', 'Photo upload', 'File upload', 'Map pin']} />
        </Panel>
        <Panel title="5 · Routing and governance">
          <FormGrid fields={['Department', 'Sub-unit', 'Priority', 'SLA target', 'Internal note', 'Visibility: Internal only']} />
          <button className="primary wide">Create internal record · tracking no generated</button>
        </Panel>
      </div>
    </ProductShell>
  )
}

function PerformanceFrame() {
  return (
    <ProductShell edition="Pro" active="Performance" title="Performance Dashboard" subtitle="SLA, handling time and operational accountability.">
      <div className="analytics-grid">
        <MetricCard label="SLA compliance" value="84%" hint="-6 vs previous" />
        <MetricCard label="Avg handling" value="3.8 gün" hint="resolved records" />
        <MetricCard label="Backlog aging" value="29" hint="7+ days old" />
        <MetricCard label="Overdue trend" value="14" hint="current breaches" />
        <Panel title="SLA trend"><MiniChart tall /></Panel>
        <Panel title="Performance by category"><BarList rows={['Yol ve Kaldırım', 'Temizlik', 'Aydınlatma', 'Altyapı']} /></Panel>
        <Panel title="Department comparison"><BarList rows={departments.map((d) => d[0])} /></Panel>
      </div>
    </ProductShell>
  )
}

function SpatialFrame() {
  return (
    <ProductShell edition="Pro" active="Spatial" title="Spatial Intelligence" subtitle="Hotspots, repeated locations and neighborhood pressure.">
      <div className="spatial-grid">
        <div className="heatmap"><MiniMap large pins heat /></div>
        <Panel title="Neighborhood pressure ranking"><BarList rows={['Alsancak', 'Adatepe', 'Kemeraltı', 'Bostanlı', 'Kazımdirik']} /></Panel>
        <Panel title="Repeated issue clusters"><ActivityRow item="Adatepe 12. Sokak" detail="6 water accumulation records in 30 days" /><ActivityRow item="Kemeraltı entrance" detail="4 safety records, 2 internal" /><ActivityRow item="Bostanlı park zone" detail="Recurring lighting issue" /></Panel>
      </div>
    </ProductShell>
  )
}

function DepartmentsFrame() {
  return (
    <ProductShell edition="Pro" active="Departments" title="Departments + Routing" subtitle="Assignment, ownership and workload control.">
      <div className="department-grid">
        {departments.map((d) => <Panel key={d[0]} title={d[0]} action={d[3]}><WorkloadRow row={d} /><div className="subunits"><span>Yol Bakım</span><span>Saha Ekibi</span><span>Koordinasyon</span></div></Panel>)}
      </div>
    </ProductShell>
  )
}

function SettingsFrame() {
  return (
    <ProductShell edition="Pro" active="Settings" title="Settings + Entitlements" subtitle="Show Free vs Pro capability boundaries clearly.">
      <div className="settings-grid">
        <Panel title="Edition matrix"><EntitlementRows /></Panel>
        <Panel title="Governance rules"><ActivityRow item="Citizen-originated complaints" detail="Municipality can update process, cannot control public visibility." /><ActivityRow item="Municipality Internal" detail="Internal by default; publish only after review/resolution." /><ActivityRow item="Internal notes" detail="Never citizen-visible." /></Panel>
      </div>
    </ProductShell>
  )
}

function MetricCard({ label, value, hint }) { return <div className="metric-card"><span>{label}</span><b>{value}</b><small>{hint}</small></div> }
function Panel({ title, action, children }) { return <section className="panel"><div className="panel-head"><h3>{title}</h3>{action && <button>{action}</button>}</div>{children}</section> }
function Badge({ children, tone = 'neutral' }) { return <span className={`badge ${tone}`}>{children}</span> }
function AttentionItem({ title, value, tone }) { return <div className={`attention ${tone}`}><b>{value}</b><span>{title}</span></div> }
function ActivityRow({ item, detail }) { return <div className="activity-row"><b>{item}</b><span>{detail}</span></div> }
function WorkloadRow({ row }) { return <div className="workload-row"><b>{row[0]}</b><div><span style={{ width: `${row[1]}%` }} /></div><small>{row[1]} açık · {row[2]} riskli</small></div> }
function Field({ label, value }) { return <div className="field"><span>{label}</span><b>{value}</b></div> }
function LockedUpgrade() { return <div className="upgrade-card"><b>Pro modules locked</b><p>Kanban, internal intake, SLA and performance dashboards are visible as upgrade path.</p></div> }
function ProOpsCard() { return <div className="upgrade-card pro"><b>Pro active</b><p>Internal intake, SLA, routing, Kanban and analytics enabled.</p></div> }
function LockedPreview({ compact }) { return <div className={`locked-preview ${compact ? 'compact' : ''}`}><b>🔒 Pro preview</b><p>Advanced workflow, internal intake and management dashboards unlock in Pro.</p></div> }
function StageDistribution() { return <div className="stage-bars">{stages.map((s, i) => <div key={s}><span>{s}</span><b style={{ width: `${[42, 28, 51, 36, 19][i]}%` }} /></div>)}</div> }
function MiniChart({ tall }) { return <div className={`mini-chart ${tall ? 'tall' : ''}`}>{[32, 48, 42, 61, 55, 70, 64, 78].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div> }
function MiniMap({ large, pins, heat }) { return <div className={`mini-map ${large ? 'large' : ''} ${heat ? 'heat' : ''}`}>{pins && complaints.map((c, i) => <span className={`pin p${i}`} key={c.id} />)}<em>Municipality spatial layer</em></div> }
function NoteComposer() { return <div className="note-composer"><textarea defaultValue="Internal coordination note: Zabıta and Fen İşleri should inspect same field point before public update." /><button className="secondary">Save internal note</button><button className="primary">Publish official update</button></div> }
function FreeStatusBox() { return <div className="free-status"><p>Free users can update simple status and mark resolved. Pro-only notes and SLA are locked.</p><button className="secondary">Mark as in progress</button></div> }
function MapListItem({ complaint }) { return <div className="map-list-item"><b>{complaint.id}</b><span>{complaint.location}</span><Badge tone={complaint.source.includes('Internal') ? 'internal' : 'public'}>{complaint.source}</Badge></div> }
function KanbanCard({ complaint }) { return <div className="kanban-card"><b>{complaint.id}</b><p>{complaint.title}</p><div><Badge>{complaint.category}</Badge><Badge tone={complaint.sla === 'Gecikti' ? 'late' : complaint.sla === 'Riskli' ? 'warn' : 'ok'}>{complaint.sla}</Badge></div><small>{complaint.owner} · {complaint.location}</small></div> }
function FormGrid({ fields }) { return <div className="form-grid">{fields.map((f) => <label key={f}><span>{f}</span><input placeholder={f} /></label>)}</div> }
function BarList({ rows }) { return <div className="bar-list">{rows.map((r, i) => <div key={r}><span>{r}</span><b><em style={{ width: `${[78, 54, 43, 36, 25][i % 5]}%` }} /></b></div>)}</div> }
function EntitlementRows() { return <div className="entitlements">{['Complaint queue', 'Basic map', 'Internal intake', 'Kanban workflow', 'SLA + priority', 'Performance dashboard', 'Spatial intelligence'].map((item, i) => <div key={item}><span>{item}</span><Badge tone={i < 2 ? 'ok' : 'internal'}>{i < 2 ? 'Free + Pro' : 'Pro'}</Badge></div>)}</div> }

export default App
