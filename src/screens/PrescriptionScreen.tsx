import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, ShieldAlert, Award, Calendar, ChevronRight, Check } from 'lucide-react';
import { Address } from '../types';

interface OcrHighlight {
  id: string;
  category: 'clinic' | 'doctor' | 'patient' | 'medication' | 'dosage' | 'date';
  word: string;
  top: number;
  left: number;
  width: number;
  height: number;
  labelText: string;
  confidence: number;
}

const getOcrHighlights = (fileName: string): OcrHighlight[] => {
  if (fileName.includes('Amoxicillin')) {
    return [
      {
        id: 'h1',
        category: 'clinic',
        word: 'Klinik Medika Ibu',
        top: 6,
        left: 20,
        width: 60,
        height: 10,
        labelText: 'Nama Klinik & Instansi',
        confidence: 98
      },
      {
        id: 'h2',
        category: 'doctor',
        word: 'Dr. Adrian Wijaya',
        top: 20,
        left: 12,
        width: 45,
        height: 7,
        labelText: 'Dokter Pemeriksa / SIP',
        confidence: 99
      },
      {
        id: 'h3',
        category: 'patient',
        word: 'Budi Santoso',
        top: 36,
        left: 15,
        width: 40,
        height: 6,
        labelText: 'Identitas Pasien',
        confidence: 96
      },
      {
        id: 'h4',
        category: 'medication',
        word: 'Amoxicillin 500mg (15 Pcs)',
        top: 50,
        left: 10,
        width: 60,
        height: 9,
        labelText: 'Medication: Bahan Aktif Resep',
        confidence: 97
      },
      {
        id: 'h5',
        category: 'dosage',
        word: '3 x Sehari 1 Tablet (Habiskan)',
        top: 64,
        left: 10,
        width: 58,
        height: 8,
        labelText: 'Dosage / Aturan Pakai',
        confidence: 95
      },
      {
        id: 'h6',
        category: 'date',
        word: '25 Mei 2026',
        top: 80,
        left: 65,
        width: 25,
        height: 7,
        labelText: 'Tanggal Resep Resmi',
        confidence: 94
      }
    ];
  } else if (fileName.includes('Paracetamol')) {
    return [
      {
        id: 'h1',
        category: 'clinic',
        word: 'Rumah Sakit Sentosa Ibu & Anak',
        top: 5,
        left: 15,
        width: 70,
        height: 11,
        labelText: 'Nama Rumah Sakit Terakreditasi',
        confidence: 99
      },
      {
        id: 'h2',
        category: 'doctor',
        word: 'Dr. Amanda Lubis',
        top: 22,
        left: 15,
        width: 45,
        height: 7,
        labelText: 'Nama Dokter Spesialis',
        confidence: 98
      },
      {
        id: 'h3',
        category: 'patient',
        word: 'Siti Rahma (34 Th)',
        top: 38,
        left: 20,
        width: 40,
        height: 6,
        labelText: 'Identitas Pasien Terdaftar',
        confidence: 97
      },
      {
        id: 'h4',
        category: 'medication',
        word: 'Paracetamol Forte 650mg',
        top: 52,
        left: 12,
        width: 55,
        height: 9,
        labelText: 'Medication: Analgesik Sifat Kuat',
        confidence: 99
      },
      {
        id: 'h5',
        category: 'dosage',
        word: '3 x Sehari 1 Tablet jika demam (>38.5C)',
        top: 65,
        left: 12,
        width: 62,
        height: 8,
        labelText: 'Dosage / Indikasi Pemberian',
        confidence: 96
      },
      {
        id: 'h6',
        category: 'date',
        word: '26 Mei 2026',
        top: 82,
        left: 60,
        width: 30,
        height: 7,
        labelText: 'Tanggal Berlaku Resep',
        confidence: 95
      }
    ];
  } else {
    return [
      {
        id: 'hg1',
        category: 'clinic',
        word: 'Pusat Medis / Klinik Rekanan',
        top: 8,
        left: 15,
        width: 70,
        height: 10,
        labelText: 'Header Klinik / RS Terdeteksi',
        confidence: 92
      },
      {
        id: 'hg2',
        category: 'doctor',
        word: 'Tanda Tangan & SIP Dokter Resmi',
        top: 24,
        left: 15,
        width: 50,
        height: 8,
        labelText: 'Dokter Pengesah',
        confidence: 95
      },
      {
        id: 'hg3',
        category: 'medication',
        word: 'Bahan Kombinasi Obat Paten R/',
        top: 50,
        left: 10,
        width: 55,
        height: 9,
        labelText: 'Medication: Formula Terapis',
        confidence: 94
      },
      {
        id: 'hg4',
        category: 'dosage',
        word: 'Aturan Pakai: Gunakan Rutin Sesuai Indikasi',
        top: 64,
        left: 10,
        width: 60,
        height: 8,
        labelText: 'Dosage & Frekuensi Penggunaan',
        confidence: 91
      },
      {
        id: 'hg5',
        category: 'patient',
        word: 'Nama Pasien Terlampir',
        top: 78,
        left: 15,
        width: 45,
        height: 7,
        labelText: 'Metrik Identifikasi Pasien',
        confidence: 97
      }
    ];
  }
};

interface PrescriptionScreenProps {
  onAddPrescriptionOrder: (notes: string, fileName: string, fileUrl: string) => void;
  mainAddress: Address;
}

export default function PrescriptionScreen({
  onAddPrescriptionOrder,
  mainAddress
}: PrescriptionScreenProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; preview: string } | null>(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // AI OCR Scanning Live States
  const [ocrState, setOcrState] = useState<'idle' | 'scanning' | 'ready'>('idle');
  const [ocrProgress, setOcrProgress] = useState(0);
  const [activeOcrStepText, setActiveOcrStepText] = useState('');
  const [revealedOcrIds, setRevealedOcrIds] = useState<string[]>([]);
  const [hoveredOcrItem, setHoveredOcrItem] = useState<string | null>(null);
  const [activeOcrFilter, setActiveOcrFilter] = useState<string>('all');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger OCR scan when selectedFile finishes uploading
  React.useEffect(() => {
    if (!selectedFile) {
      setOcrState('idle');
      setOcrProgress(0);
      setActiveOcrStepText('');
      setRevealedOcrIds([]);
      return;
    }

    setOcrState('scanning');
    setOcrProgress(0);
    setRevealedOcrIds([]);

    const steps = [
      { text: 'Menginisialisasi Pembaca Pintar AI OCR...', delay: 0, progress: 10, reveal: [] },
      { text: 'Mendeteksi Kop Dokumen & Nama Klinik...', delay: 800, progress: 30, reveal: ['h1', 'hg1'] },
      { text: 'Mencari Tanda Tangan & Kredensial Dokter...', delay: 1600, progress: 50, reveal: ['h1', 'hg1', 'h2', 'hg2', 'h6'] },
      { text: 'Mengekstrak Identifikasi Pasien (Patient)...', delay: 2400, progress: 70, reveal: ['h1', 'hg1', 'h2', 'hg2', 'h6', 'h3', 'hg5'] },
      { text: 'Mendeteksi Sediaan Obat & Bahan Aktif (Medication)...', delay: 3200, progress: 85, reveal: ['h1', 'hg1', 'h2', 'hg2', 'h6', 'h3', 'hg5', 'h4', 'hg3'] },
      { text: 'Mengurai Frekuensi Dosis & Aturan Pakai (Dosage)...', delay: 4000, progress: 95, reveal: ['h1', 'hg1', 'h2', 'hg2', 'h6', 'h3', 'hg5', 'h4', 'hg3', 'h5', 'hg4'] },
      { text: 'OCR Analisis Selesai! Klik elemen untuk detail.', delay: 4800, progress: 100, reveal: ['h1', 'hg1', 'h2', 'hg2', 'h6', 'h3', 'hg5', 'h4', 'hg3', 'h5', 'hg4'] }
    ];

    const timers: NodeJS.Timeout[] = [];

    steps.forEach((step, idx) => {
      const t = setTimeout(() => {
        setActiveOcrStepText(step.text);
        setOcrProgress(step.progress);
        
        // Filter highlights to reveal
        const fileHighlights = getOcrHighlights(selectedFile.name);
        const matchIds = fileHighlights
          .filter(h => step.reveal.includes(h.id))
          .map(h => h.id);
        setRevealedOcrIds(matchIds);

        if (idx === steps.length - 1) {
          setOcrState('ready');
          // Automatically append some detected information to the apotecker notes if the notes are empty!
          setNotes(prevNotes => {
            if (prevNotes.trim() === '') {
              const med = fileHighlights.find(h => h.category === 'medication');
              const dos = fileHighlights.find(h => h.category === 'dosage');
              const medText = med ? med.word : '';
              const dosText = dos ? dos.word : '';
              if (medText) {
                return `[Hasil AI OCR: Terdeteksi ${medText} (${dosText})]. Tolong hubungi saya bila sediaan kosong.`;
              }
            }
            return prevNotes;
          });
        }
      }, step.delay);
      timers.push(t);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [selectedFile?.name]);

  // Predefined Mock Doctor Prescriptions for easy testing/simulation click
  const samplePrescriptions = [
    {
      name: 'Resep_Klinik_Medika_Amoxicillin.jpg',
      size: '1.2 MB',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACskffCt6J0XQVjIxzBIpsfOW5s6ljv8VvT35YvvpPFhkXTz7g68ceSso0NB7y1fw6G9LZ4CMrIHc4bVZfTizr6LiFkVU25m7EImk-UdNmbSUB5WIrJmMrPexdPhDYgVQedZWV3d5X1uUsJRnaZCHzvIAs9EnC-hSXk38IL-58zvNnoNWycC6mR_RcbGCHJBmjunecNW5ITd5h7Tf_9YtFYq7rdpgCWMgYnyrZCD5OJWQAWvXE6vKuVG31MfhG3nBXRauo6AV12iU'
    },
    {
      name: 'Resep_RS_Sentosa_Paracetamol_Forte.pdf',
      size: '850 KB',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2QyUX9FbqGm2E6NUIwGb5vOiSXOxu_rx2AvBDL7WA-F4hjH_DtJqiPfoZG6Bi0QCT1XxeGoDnpLNiCUOvmJwq7AqtprjHDw7iFZQNLnTiBwgeb3FsB1E50_IbrPt1OiXsBXeENM2dMDWVzkLsvBirSXh-z1KEZjI1RoDGCtM-Q9WYVg-huk1OAQn5OwgviOw3Cu9WiTi-zLEGh5eV3-ybljkNhrB6BgoviDJB10c3paSstmYSvIyUKwVsI5Qvzm4khBea846hilM'
    }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      simulateUpload(file.name, (file.size / 1024 / 1024).toFixed(1) + ' MB');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      simulateUpload(file.name, (file.size / 1024 / 1024).toFixed(1) + ' MB');
    }
  };

  const selectSamplePrescription = (sample: typeof samplePrescriptions[0]) => {
    simulateUpload(sample.name, sample.size, sample.url);
  };

  const simulateUpload = (name: string, size: string, url = '') => {
    setSelectedFile(null);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSelectedFile({
            name,
            size,
            preview: url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuACskffCt6J0XQVjIxzBIpsfOW5s6ljv8VvT35YvvpPFhkXTz7g68ceSso0NB7y1fw6G9LZ4CMrIHc4bVZfTizr6LiFkVU25m7EImk-UdNmbSUB5WIrJmMrPexdPhDYgVQedZWV3d5X1uUsJRnaZCHzvIAs9EnC-hSXk38IL-58zvNnoNWycC6mR_RcbGCHJBmjunecNW5ITd5h7Tf_9YtFYq7rdpgCWMgYnyrZCD5OJWQAWvXE6vKuVG31MfhG3nBXRauo6AV12iU',
          });
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsSubmitting(true);
    // Simulate smart backend server validation of doctor prescription with OCR engine checks
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
      onAddPrescriptionOrder(
        notes || 'Konfirmasi resep klinis',
        selectedFile.name,
        selectedFile.preview
      );
    }, 2800);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Title Header */}
      <div>
        <h2 className="text-2.5xl font-extrabold tracking-tight text-gray-900">
          Kirim &amp; Tebus Resep Dokter Online
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-sans mt-0.5 max-w-2xl leading-relaxed">
          Apoteker kami akan langsung memverifikasi keaslian dokumen resep Anda, menyesuaikan stok obat paten atau generik, dan menyiapkan paket pengantaran dalam 15 menit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: UPLOADS &amp; NOTES FORMS */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-xl p-6 space-y-6">
          
          <form onSubmit={handleSubmitPrescription} className="space-y-6">
            
            {/* DRAG AND DROP CONTAINER */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Unggah Foto / PDF Resep Dokter Resmi
              </label>
              
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={handleTriggerFileInput}
                className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all ${
                  dragActive ? 'border-[#006c51] bg-emerald-50/50' : 'border-gray-300 hover:border-emerald-300 hover:bg-gray-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#006c51] flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      Tarik &amp; lepas file resep di sini, atau <span className="text-[#006c51] underline">pilih file</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1 font-sans">
                      Format file didukung: JPG, PNG, PDF (Maksimal 10 MB)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PRE-SELECTABLE CLINICAL TEST SAMPLES */}
            {!selectedFile && uploadProgress === 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Metode Cepat (Gunakan Resep Contoh):</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {samplePrescriptions.map(s => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => selectSamplePrescription(s)}
                      className="p-3 border border-gray-200 hover:border-emerald-250 hover:bg-emerald-50/20 text-left rounded-lg text-xs font-sans flex items-center gap-2.5 transition-all text-gray-750 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#006c51] shrink-0" />
                      <div className="truncate">
                        <p className="font-bold text-gray-800 truncate">{s.name}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{s.size}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* UPLOADING ACTION STATE &amp; PROGRESS */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="p-4 border border-gray-100 bg-gray-50 rounded-lg space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-700">Mengunggah File Resep Dokter...</span>
                  <span className="font-bold text-[#006c51] shrink-0">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#006c51] h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            )}

            {/* SUCCESS UPLOADED FILE PREVIEW & OCR ANALYSIS INTERACTIVE STAGE */}
            {selectedFile && (
              <div className="space-y-4">
                
                {/* 1. File Upload Indicator Details Banner */}
                <div className="p-4 border border-emerald-100 bg-emerald-500/5 rounded-xl flex items-center justify-between gap-4 font-sans">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-[#006c51]/10 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-[#006c51]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-850 text-xs sm:text-sm truncate">{selectedFile.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Ukuran Dokumen: {selectedFile.size}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setOcrState('idle');
                    }}
                    className="text-xs font-bold text-gray-400 hover:text-red-650 transition-colors uppercase shrink-0 cursor-pointer"
                  >
                    Ganti File
                  </button>
                </div>

                {/* 2. Interactive AI OCR Scan Dashboard */}
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50 space-y-4 font-sans shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-150 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3 select-none">
                          <span className={`${ocrState === 'scanning' ? 'animate-ping' : ''} absolute inline-flex h-full w-full rounded-full ${ocrState === 'ready' ? 'bg-emerald-500' : 'bg-amber-500'} opacity-75`}></span>
                          <span className={`relative inline-flex rounded-full h-3 w-3 ${ocrState === 'ready' ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                        </span>
                        <h3 className="text-sm font-extrabold text-gray-950 tracking-tight flex items-center gap-1.5">
                          Analisis Real-Time AI OCR Resep Dokter
                        </h3>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed font-sans mt-0.5">
                        Teknologi OCR menguji keaslian, sediaan farmasi aktif, dan validasi kode resep.
                      </p>
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors ${ocrState === 'ready' ? 'bg-emerald-550/10 text-[#006c51]' : 'bg-amber-50 text-amber-800'}`}>
                      Kecocokan: {ocrProgress}%
                    </div>
                  </div>

                  {/* OCR Real-time terminal status message bar */}
                  <div className="text-xs font-mono py-2 px-3.5 bg-slate-900 text-emerald-400 rounded-lg border border-slate-850 flex items-center justify-between gap-2 shadow-inner">
                    <span className="truncate">📎 Status: {activeOcrStepText}</span>
                    <span className="animate-pulse flex items-center font-bold text-[10px] text-emerald-300">
                      {ocrState === 'scanning' ? 'PEMINDAIAN AKTIF...' : 'SELESAI'}
                    </span>
                  </div>

                  {/* DOUBLE COLUMN STAGE GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                    
                    {/* LEFT PANEL: PREVIEW STAGE WITH INTERACTIVE NEON BOUNDING BOXES */}
                    <div className="relative border border-slate-200 bg-[#edf1f2] rounded-xl overflow-hidden min-h-[300px] h-[300px] flex flex-col justify-between shadow-inner">
                      
                      {/* Scanning laser line overlay */}
                      {ocrState === 'scanning' && (
                        <div className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 shadow-[0_0_12px_#10b981] z-20 pointer-events-none animate-scanner-laser" />
                      )}

                      {/* Main document preview */}
                      <div className="relative w-full h-full flex-grow flex items-center justify-center p-4 overflow-hidden">
                        
                        {selectedFile.preview.endsWith('.pdf') || selectedFile.name.endsWith('.pdf') ? (
                          <div className="flex flex-col items-center justify-center text-center p-6 space-y-3 bg-white border border-gray-250 rounded-xl max-w-[210px] shadow-sm">
                            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center border border-rose-100">
                              <FileText className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-800 text-[11px] truncate max-w-[170px]">{selectedFile.name}</p>
                              <p className="text-[9px] text-gray-400 mt-0.5">Dokumen PDF Resmi</p>
                            </div>
                            <div className="bg-emerald-50 text-[#006c51] text-[9px] px-2 py-0.5 rounded-full font-bold">
                              Kompabilitas OCR OK
                            </div>
                          </div>
                        ) : (
                          <img
                            src={selectedFile.preview}
                            alt="Pratinjau Resep Dokter"
                            referrerPolicy="no-referrer"
                            className="max-h-[260px] max-w-full w-auto object-contain rounded-lg shadow-sm"
                          />
                        )}

                        {/* HOVER OVERLAYS IN ACTION CO-ORDINATES */}
                        <div className="absolute inset-0 z-10">
                          {getOcrHighlights(selectedFile.name).map((h) => {
                            const isRevealed = revealedOcrIds.includes(h.id);
                            if (!isRevealed) return null;

                            // Style configurations
                            const isMedic = h.category === 'medication';
                            const isDosage = h.category === 'dosage';
                            
                            let boxBorderClass = "border-sky-500 bg-sky-500/10";
                            let prefixText = "ℹ️ INF";

                            if (isMedic) {
                              boxBorderClass = "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20";
                              prefixText = "💊 MEDIKASI";
                            } else if (isDosage) {
                              boxBorderClass = "border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/20";
                              prefixText = "⏱️ DOSIS";
                            } else if (h.category === 'clinic') {
                              boxBorderClass = "border-purple-500 bg-purple-500/10";
                              prefixText = "🏥 KLINIK";
                            } else if (h.category === 'doctor') {
                              boxBorderClass = "border-indigo-500 bg-indigo-500/10";
                              prefixText = "🩺 DOKTER";
                            } else if (h.category === 'patient') {
                              boxBorderClass = "border-rose-500 bg-rose-500/10";
                              prefixText = "👤 PASIEN";
                            }

                            const isHovered = hoveredOcrItem === h.id;

                            return (
                              <div
                                key={h.id}
                                onMouseEnter={() => setHoveredOcrItem(h.id)}
                                onMouseLeave={() => setHoveredOcrItem(null)}
                                className={`absolute rounded border-2 transition-all cursor-zoom-in ${boxBorderClass} ${isHovered ? 'scale-[1.02] ring-4 ring-[#006c51]/30 bg-emerald-500/25 z-30 border-emerald-600' : 'z-10 bg-opacity-10'}`}
                                style={{
                                  top: `${h.top}%`,
                                  left: `${h.left}%`,
                                  width: `${h.width}%`,
                                  height: `${h.height}%`,
                                }}
                              >
                                {/* Tooltip label positioned neatly relative */}
                                <div className={`absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 border border-slate-700 text-white text-[9px] font-bold py-0.5 px-2 rounded shadow-xl flex items-center gap-1.5 transition-all duration-150 pointer-events-none ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                                  <span className="text-[#10b981]">{prefixText}</span>
                                  <span className="text-gray-300">|</span>
                                  <span>Tingkat Kepercayaan: {h.confidence}%</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Info stage footer label */}
                      <div className="bg-slate-950 px-3.5 py-2 text-[10px] text-gray-400 font-mono tracking-tight flex justify-between items-center select-none z-10 border-t border-slate-850">
                        <span>🔍 HOVER BAGIAN RESEP UNTUK REVIEW</span>
                        <span className="text-emerald-400 font-medium">REAL-TIME MULTI-SCAN v4.1</span>
                      </div>
                    </div>

                    {/* RIGHT PANEL: DYNAMIC EXCLUSIVELY REVEALED RESULTS & FILTER */}
                    <div className="flex flex-col justify-between border border-gray-200 rounded-xl bg-white p-4 space-y-3 shadow-xs">
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[11px] font-extrabold text-gray-900 uppercase tracking-wider">
                            Metadata Terdeteksi ({revealedOcrIds.length}/{getOcrHighlights(selectedFile.name).length})
                          </h4>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Keakuratan AI</span>
                        </div>

                        {/* Keyword-category selector tabs */}
                        <div className="flex flex-wrap gap-1 border-b border-gray-150 pb-2">
                          {[
                            { id: 'all', label: 'Semu' },
                            { id: 'medic', label: 'Medikasi' },
                            { id: 'dosage', label: 'Dosis' },
                            { id: 'info', label: 'Lainnya' }
                          ].map(pill => (
                            <button
                              key={pill.id}
                              type="button"
                              onClick={() => setActiveOcrFilter(pill.id)}
                              className={`text-[9px] uppercase tracking-wider px-2 py-1 rounded font-bold transition-all cursor-pointer ${
                                activeOcrFilter === pill.id
                                  ? 'bg-[#006c51] text-white shadow-sm'
                                  : 'bg-gray-105 text-gray-500 hover:bg-gray-200 hover:text-gray-800'
                              }`}
                            >
                              {pill.label}
                            </button>
                          ))}
                        </div>

                        {/* List items block */}
                        <div className="space-y-2 overflow-y-auto max-h-[160px] pr-1 scrollbar-thin">
                          {getOcrHighlights(selectedFile.name)
                            .filter(h => {
                              if (activeOcrFilter === 'medic') return h.category === 'medication';
                              if (activeOcrFilter === 'dosage') return h.category === 'dosage';
                              if (activeOcrFilter === 'info') return h.category !== 'medication' && h.category !== 'dosage';
                              return true;
                            })
                            .map((h) => {
                              const isRevealed = revealedOcrIds.includes(h.id);
                              const isHovered = hoveredOcrItem === h.id;
                              
                              if (!isRevealed) {
                                return (
                                  <div key={h.id} className="p-2 border border-dashed border-gray-150 rounded-lg flex items-center justify-between opacity-30 font-mono text-[10px] text-gray-400 bg-gray-50/10">
                                    <span>[Mencari hash biner...]</span>
                                    <span>--%</span>
                                  </div>
                                );
                              }

                              const isMedic = h.category === 'medication';
                              const isDosage = h.category === 'dosage';

                              return (
                                <div
                                  key={h.id}
                                  onMouseEnter={() => setHoveredOcrItem(h.id)}
                                  onMouseLeave={() => setHoveredOcrItem(null)}
                                  className={`p-2.5 rounded-lg border transition-all text-xs flex flex-col gap-1 cursor-pointer ${
                                    isHovered 
                                      ? 'border-[#006c51] bg-[#006c51]/5 shadow-sm' 
                                      : isMedic 
                                        ? 'border-emerald-200 bg-emerald-500/5'
                                        : isDosage
                                          ? 'border-amber-200 bg-amber-500/5'
                                          : 'border-slate-200 bg-slate-50/70'
                                  }`}
                                >
                                  <div className="flex justify-between items-center">
                                    <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                                      isMedic 
                                        ? 'bg-emerald-100 text-emerald-800' 
                                        : isDosage 
                                          ? 'bg-amber-100 text-amber-800 font-extrabold' 
                                          : 'bg-gray-155 text-gray-700'
                                    }`}>
                                      {h.labelText}
                                    </span>
                                    <span className="text-[10px] font-bold font-mono text-[#006c51]">{h.confidence}%</span>
                                  </div>
                                  <p className={`font-extrabold text-gray-900 leading-tight ${isMedic || isDosage ? 'text-[#006c51]' : ''}`}>
                                    {h.word}
                                  </p>
                                </div>
                              );
                            })}
                        </div>
                      </div>

                      {/* Quick helper tag notice */}
                      <div className="p-2.5 bg-blue-50 border border-blue-100 text-blue-800 rounded-lg text-[10px] leading-relaxed font-sans">
                        <span className="font-bold flex items-center gap-1 mb-0.5 text-blue-900">
                          ⚡ Kecerdasan OCR Terintegrasi
                        </span>
                        Apoteker Sarah dapat mereferensikan sediaan obat dari teks di atas untuk menjaga konsistensi peresepan klinis Anda.
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* ADDITIONAL PRESCRIPTION REMARKS NOTES */}
            <div className="space-y-2">
              <label htmlFor="prescription-notes" className="block text-sm font-bold text-gray-900">
                Catatan Tambahan untuk Apoteker (Opsional)
              </label>
              <textarea
                id="prescription-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Misal: 'Ganti ke obat versi generik jika obat paten sirup kosong' atau 'Tolong pisahkan bungkusan plastik untuk ditaruh di kantor...'"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#006c51] font-sans"
              />
            </div>

            {/* SUBMIT FORM BUTTON DIRECT */}
            <button
              disabled={!selectedFile || isSubmitting}
              type="submit"
              className={`w-full py-3 text-white text-sm font-bold rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedFile && !isSubmitting
                  ? 'bg-[#006c51] hover:bg-emerald-800 hover:shadow-md'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Ajukan Pengecekan Dokumen Resep
            </button>
          </form>
        </div>

        {/* RIGHT PANEL: CLINICAL STANDARDS &amp; TRUST ELEMENTS */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Main Delivery Destination confirmation */}
          <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl space-y-3">
            <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider">Tujuan Pengiriman Obat</h4>
            <div className="text-xs text-gray-600 space-y-1 font-sans">
              <p className="font-bold text-gray-800">{mainAddress.name} ({mainAddress.phone})</p>
              <p className="leading-relaxed line-clamp-2">{mainAddress.street}</p>
            </div>
            <p className="text-[10px] text-[#006c51] font-bold">✓ Alamat utama terkonfirmasi aktif</p>
          </div>

          <div className="bg-white border border-gray-250 rounded-xl p-5 space-y-5">
            <h4 className="font-bold text-gray-900 text-sm">Alur Layanan Tebus Resep</h4>
            
            <div className="space-y-4 font-sans text-xs">
              <div className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-[#006c51] text-white flex items-center justify-center text-[10px] font-extrabold shrink-0">1</span>
                <div>
                  <h5 className="font-bold text-gray-805 text-xs">Unggah Dokumen Resep</h5>
                  <p className="text-gray-400 mt-0.5">Kirim salinan foto resep kertas dokter Anda di panel kiri.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-[#006c51] text-white flex items-center justify-center text-[10px] font-extrabold shrink-0">2</span>
                <div>
                  <h5 className="font-bold text-gray-805 text-xs">Pemeriksaan dan Validasi</h5>
                  <p className="text-gray-400 mt-0.5">Apoteker memeriksa kompatibilitas sediaan medis, stok, dan harga.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-[#006c51] text-white flex items-center justify-center text-[10px] font-extrabold shrink-0">3</span>
                <div>
                  <h5 className="font-bold text-gray-805 text-xs">Pembayaran Tagihan</h5>
                  <p className="text-gray-400 mt-0.5">Anda mendapatkan konfirmasi rincian harga obat untuk dibayar online.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-[#006c51] text-white flex items-center justify-center text-[10px] font-extrabold shrink-0">4</span>
                <div>
                  <h5 className="font-bold text-gray-855 text-xs">Paket Dikirim Instan</h5>
                  <p className="text-gray-400 mt-0.5">Obat langsung ditaruh ke wadah steril dan dikirim motor cepat.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Clinician badging details */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-[#006c51] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Jaminan Lisensi BPOM &amp; Kemenkes</h4>
                <p className="text-xs text-gray-400 font-sans mt-1">
                  Kami mematuhi secara ketat seluruh protokol penyerahan persediaan obat-obatan golongan keras wajib disertai resep dokter asli.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VERIFYING DIALOG SCREEN SCANNING PROGRESS */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center space-y-6 shadow-2xl">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-4 border-[#006c51]/10 rounded-full" />
              <div className="absolute inset-0 border-4 border-[#006c51] border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-4 bg-emerald-50 rounded-full flex items-center justify-center text-[#006c51]">
                <FileText className="w-8 h-8 animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-extrabold text-[#006c51] text-lg">Memindai &amp; Memverifikasi Resep...</h3>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                Teknologi AI OCR bekerjasama dengan Apoteker Sarah sedang mendeteksi resep obat, sediaan miligram, dan kecocokan stok sediaan kesehatan pada server pusat...
              </p>
            </div>
            <div className="w-full bg-gray-250 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#006c51] h-full animate-pulse-progress" />
            </div>
          </div>
        </div>
      )}

      {/* DONE / SUCCESS DIALOG BANNER WINDOW */}
      {isDone && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-50 text-[#006c51] rounded-full flex items-center justify-center mx-auto border-2 border-[#006c51]/20">
              <Check className="w-8 h-8 font-extrabold" />
            </div>

            <div className="space-y-2">
              <h3 className="font-extrabold text-gray-900 text-lg">Resep Dokter Diajukan!</h3>
              <p className="text-xs text-gray-500 font-sans leading-relaxed leading-relaxed">
                Pengiriman dokumen penawaran resep <span className="font-bold text-gray-800">{selectedFile?.name}</span> telah berhasil masuk ke antrean pendaftaran apotek.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl text-left border border-emerald-100">
              <h4 className="font-bold text-gray-900 text-xs">Pemberitahuan Sistem:</h4>
              <p className="text-[11px] text-gray-500 leading-normal font-sans mt-1">
                Apoteker Sarah sedang meramu obat sesuai dokumen Anda. Detail harga penawaran obat akan langsung muncul terdaftar di halaman <span className="font-bold text-[#006c51]">"Riwayat Pesanan"</span> dengan tagihan Rp 145.000 (Setatus: Diproses).
              </p>
            </div>

            <button
              onClick={() => {
                setIsDone(false);
                setSelectedFile(null);
                setNotes('');
                setUploadProgress(0);
              }}
              className="w-full py-2.5 bg-[#006c51] hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow transition-all cursor-pointer"
            >
              Kembali ke Resep Dokter
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
