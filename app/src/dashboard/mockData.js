/* Hardcoded mock data for the developer dashboard (front-end only). */

export const stats = [
  { key: 'estates', label: 'Estates Active', value: '6', sub: '+1 from last month', tone: 'brand', icon: 'estate' },
  { key: 'ready', label: 'Plots Ready', value: '42', sub: '68% of total plots', tone: 'emerald', icon: 'check' },
  { key: 'missing', label: 'Missing Docs', value: '23', sub: 'Across 16 plots', tone: 'amber', icon: 'doc' },
  { key: 'defects', label: 'Open Defects', value: '18', sub: 'Across 11 plots', tone: 'violet', icon: 'wrench' },
]

export const estates = [
  { id: 'maple-way', name: 'Maple Way Residence', location: 'Maple Way, Lekki', homes: 92, ready: 58, defects: 8, progress: 63 },
  { id: 'oceanview', name: 'Oceanview Apartment', location: 'Ocean Drive, Victoria Island', homes: 68, ready: 40, defects: 6, progress: 59 },
  { id: 'the-grove', name: 'The Grove Estate', location: 'Ibeju-Lekki, Lagos', homes: 53, ready: 24, defects: 3, progress: 45 },
  { id: 'harbour-point', name: 'Harbour Point', location: 'Eko Atlantic, Lagos', homes: 30, ready: 6, defects: 1, progress: 20 },
]

export const plots = [
  { id: '001', type: '4 Bed House', estate: 'Maple Way Residence', homeowner: 'James & Sarah Miller', docStatus: 'Ready', handover: '20 May 2024', defects: 0, severity: 'None', readiness: 100 },
  { id: '002', type: '4 Bed House', estate: 'Maple Way Residence', homeowner: 'Michael Brown', docStatus: 'In Review', handover: '24 May 2024', defects: 1, severity: 'Minor', readiness: 80 },
  { id: '003', type: '3 Bed House', estate: 'Maple Way Residence', homeowner: 'Emily & David Wilson', docStatus: 'Pending', handover: '27 May 2024', defects: 2, severity: 'Minor', readiness: 65 },
  { id: '004', type: '4 Bed House', estate: 'Maple Way Residence', homeowner: 'Sophia Patel', docStatus: 'Missing', handover: '—', defects: 3, severity: 'Major', readiness: 30 },
  { id: '005', type: '3 Bed House', estate: 'Maple Way Residence', homeowner: 'Daniel Thompson', docStatus: 'In Review', handover: '30 May 2024', defects: 1, severity: 'Minor', readiness: 75 },
  { id: '006', type: '4 Bed House', estate: 'Maple Way Residence', homeowner: 'Olivia & Tom Harris', docStatus: 'Ready', handover: '02 Jun 2024', defects: 0, severity: 'None', readiness: 100 },
  { id: '007', type: '3 Bed House', estate: 'Maple Way Residence', homeowner: 'William Anderson', docStatus: 'Pending', handover: '05 Jun 2024', defects: 2, severity: 'Minor', readiness: 60 },
  { id: '008', type: '4 Bed House', estate: 'Maple Way Residence', homeowner: 'Charlotte Evans', docStatus: 'Ready', handover: '08 Jun 2024', defects: 0, severity: 'None', readiness: 100 },
]

export const missingDocs = [
  { id: 'bcc', name: 'Building Control Certificate', plots: 6 },
  { id: 'nhbc', name: 'NHBC 10 Year Certificate', plots: 5 },
  { id: 'eic', name: 'Electric Installation Certificate', plots: 4 },
  { id: 'wpc', name: 'Warranty Provider Certificate', plots: 3 },
]

export const uploads = [
  { id: 'u1', name: 'Handover Pack – May 2024.pdf', files: 128, date: 'May 9, 2024', matched: 96, status: 'Completed' },
  { id: 'u2', name: 'Compliance Certificates.zip', files: 84, date: 'May 8, 2024', matched: 88, status: 'Completed' },
  { id: 'u3', name: 'Warranty Docs – Phase 2.pdf', files: 67, date: 'May 7, 2024', matched: 92, status: 'Processing' },
]

export const activity = [
  { id: 'a1', title: 'Electrical Installation Certificate uploaded', ctx: 'Plot 002', by: 'Alex Johnson', time: 'May 9, 2024 · 10:24 AM', type: 'upload' },
  { id: 'a2', title: 'Defect resolved (Front door adjustment)', ctx: 'Plot 005', by: 'Site Team', time: 'May 9, 2024 · 9:16 AM', type: 'resolved' },
  { id: 'a3', title: 'Handover pack uploaded', ctx: 'Plot 004', by: 'Alex Johnson', time: 'May 8, 2024 · 4:31 PM', type: 'upload' },
  { id: 'a4', title: 'Document matched (NHBC Certificate)', ctx: 'Plot 003', by: 'System', time: 'May 8, 2024 · 2:12 PM', type: 'match' },
  { id: 'a5', title: 'Homeowner invited: Tunde Adeyemi', ctx: 'Plot 012', by: 'Alex Johnson', time: 'May 8, 2024 · 11:02 AM', type: 'invite' },
]

export const issues = [
  { id: 'i1', plot: 'Plot 004', title: 'Snagging: Paint touch-up', severity: 'Major', status: 'Open', due: 'May 12, 2024' },
  { id: 'i2', plot: 'Plot 003', title: 'Front door adjustment', severity: 'Minor', status: 'Open', due: 'May 14, 2024' },
  { id: 'i3', plot: 'Plot 005', title: 'Kitchen door alignment', severity: 'Minor', status: 'Open', due: 'May 16, 2024' },
  { id: 'i4', plot: 'Plot 002', title: 'En-suite light fitting', severity: 'Minor', status: 'In Progress', due: 'May 18, 2024' },
  { id: 'i5', plot: 'Plot 007', title: 'Garden fence panel', severity: 'Minor', status: 'In Progress', due: 'May 20, 2024' },
  { id: 'i6', plot: 'Plot 001', title: 'Boiler pressure check', severity: 'Major', status: 'Due Soon', due: 'May 11, 2024' },
]

export const documents = [
  { id: 'd1', name: 'Handover Pack – Maple Way 001.pdf', type: 'Handover Pack', plot: 'Plot 001', size: '4.2 MB', date: 'May 9, 2024', status: 'Verified' },
  { id: 'd2', name: 'NHBC 10 Year Certificate.pdf', type: 'Certificate', plot: 'Plot 001', size: '1.1 MB', date: 'May 9, 2024', status: 'Verified' },
  { id: 'd3', name: 'Electrical Installation Cert.pdf', type: 'Certificate', plot: 'Plot 002', size: '860 KB', date: 'May 9, 2024', status: 'In Review' },
  { id: 'd4', name: 'Vaillant Boiler Manual.pdf', type: 'Manual', plot: 'Plot 002', size: '3.4 MB', date: 'May 8, 2024', status: 'Verified' },
  { id: 'd5', name: 'Kitchen Appliance Warranties.zip', type: 'Warranty', plot: 'Plot 003', size: '6.8 MB', date: 'May 8, 2024', status: 'Verified' },
  { id: 'd6', name: 'Building Control Certificate.pdf', type: 'Certificate', plot: 'Plot 004', size: '—', date: '—', status: 'Missing' },
  { id: 'd7', name: 'EPC – Energy Performance.pdf', type: 'Certificate', plot: 'Plot 005', size: '540 KB', date: 'May 7, 2024', status: 'Verified' },
  { id: 'd8', name: 'Warranty Provider Certificate.pdf', type: 'Warranty', plot: 'Plot 006', size: '—', date: '—', status: 'Missing' },
]

export const homeowners = [
  { id: 'h1', name: 'James & Sarah Miller', plot: 'Plot 001', estate: 'Maple Way Residence', email: 'j.miller@email.com', status: 'Active', invited: '18 May 2024' },
  { id: 'h2', name: 'Michael Brown', plot: 'Plot 002', estate: 'Maple Way Residence', email: 'm.brown@email.com', status: 'Invited', invited: '20 May 2024' },
  { id: 'h3', name: 'Emily & David Wilson', plot: 'Plot 003', estate: 'Maple Way Residence', email: 'wilsons@email.com', status: 'Invited', invited: '22 May 2024' },
  { id: 'h4', name: 'Sophia Patel', plot: 'Plot 004', estate: 'Oceanview Apartment', email: 's.patel@email.com', status: 'Pending', invited: '—' },
  { id: 'h5', name: 'Daniel Thompson', plot: 'Plot 005', estate: 'Oceanview Apartment', email: 'd.thompson@email.com', status: 'Active', invited: '19 May 2024' },
  { id: 'h6', name: 'Olivia & Tom Harris', plot: 'Plot 006', estate: 'The Grove Estate', email: 'harris@email.com', status: 'Active', invited: '21 May 2024' },
]

export const handoverProgress = { ready: 128, inProgress: 67, notStarted: 48 }

export const reportsMonthly = [
  { month: 'Jan', handovers: 12 },
  { month: 'Feb', handovers: 18 },
  { month: 'Mar', handovers: 22 },
  { month: 'Apr', handovers: 31 },
  { month: 'May', handovers: 45 },
  { month: 'Jun', handovers: 38 },
]

export const filesForReview = [
  { id: 'f1', name: 'Electrical Certificate – Plot 7', estate: 'Maple Way Residence', priority: 'High' },
  { id: 'f2', name: 'Building Control Sign-off – Block A', estate: 'Oceanview Apartment', priority: 'Medium' },
  { id: 'f3', name: 'Fire Risk Assessment – Tower 1', estate: 'Harbour Point', priority: 'Medium' },
]

export const plan = {
  name: 'Developer Plan',
  trialDays: 23,
  used: 3,
  total: 5,
}
