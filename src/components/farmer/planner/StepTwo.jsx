'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';

const LOCATIONS = {
  'Dhaka': {
    districts: {
      'Dhaka':       ['Dhanmondi', 'Mirpur', 'Uttara', 'Mohammadpur', 'Tejgaon', 'Savar', 'Keraniganj'],
      'Gazipur':     ['Gazipur Sadar', 'Kaliakair', 'Kapasia', 'Sreepur', 'Kaliganj'],
      'Manikganj':   ['Manikganj Sadar', 'Singair', 'Shibalaya', 'Saturia', 'Ghior'],
      'Munshiganj':  ['Munshiganj Sadar', 'Srinagar', 'Sirajdikhan', 'Louhajang', 'Tongibari'],
      'Narsingdi':   ['Narsingdi Sadar', 'Palash', 'Shibpur', 'Belabo', 'Raipura'],
      'Narayanganj': ['Narayanganj Sadar', 'Araihazar', 'Sonargaon', 'Rupganj', 'Bandar'],
      'Faridpur':    ['Faridpur Sadar', 'Bhanga', 'Saltha', 'Nagarkanda', 'Boalmari'],
      'Gopalganj':   ['Gopalganj Sadar', 'Kashiani', 'Kotalipara', 'Muksudpur', 'Tungipara'],
      'Madaripur':   ['Madaripur Sadar', 'Shibchar', 'Kalkini', 'Rajoir'],
      'Rajbari':     ['Rajbari Sadar', 'Goalanda', 'Pangsha', 'Baliakandi', 'Kalukhali'],
      'Shariatpur':  ['Shariatpur Sadar', 'Naria', 'Zanjira', 'Gosairhat', 'Damudya'],
      'Tangail':     ['Tangail Sadar', 'Kalihati', 'Sakhipur', 'Mirzapur', 'Ghatail', 'Basail'],
      'Kishoreganj': ['Kishoreganj Sadar', 'Bhairab', 'Kuliarchar', 'Bajitpur', 'Itna'],
    }
  },
  'Chittagong': {
    districts: {
      'Chittagong':      ['Chittagong Sadar', 'Hathazari', 'Raozan', 'Sitakunda', 'Mirsarai', 'Patiya', 'Anwara'],
      "Cox's Bazar":     ["Cox's Bazar Sadar", 'Teknaf', 'Ukhiya', 'Ramu', 'Chakaria', 'Pekua'],
      'Comilla':         ['Comilla Sadar', 'Daudkandi', 'Chandina', 'Muradnagar', 'Brahmanpara', 'Laksam'],
      'Feni':            ['Feni Sadar', 'Chhagalnaiya', 'Daganbhuiyan', 'Parshuram', 'Sonagazi'],
      'Brahmanbaria':    ['Brahmanbaria Sadar', 'Kasba', 'Nabinagar', 'Sarail', 'Ashuganj', 'Akhaura'],
      'Chandpur':        ['Chandpur Sadar', 'Hajiganj', 'Kachua', 'Matlab Uttar', 'Matlab Dakshin'],
      'Lakshmipur':      ['Lakshmipur Sadar', 'Raipur', 'Ramganj', 'Ramgati', 'Kamalnagar'],
      'Noakhali':        ['Noakhali Sadar', 'Begumganj', 'Hatiya', 'Subarnachar', 'Companiganj'],
      'Khagrachhari':    ['Khagrachhari Sadar', 'Dighinala', 'Panchhari', 'Mahalchhari', 'Manikchhari'],
      'Rangamati':       ['Rangamati Sadar', 'Kaptai', 'Kawkhali', 'Bagaichhari', 'Barkal'],
      'Bandarban':       ['Bandarban Sadar', 'Alikadam', 'Naikhongchhari', 'Rowangchhari', 'Thanchi'],
    }
  },
  'Rajshahi': {
    districts: {
      'Rajshahi':          ['Rajshahi Sadar', 'Paba', 'Godagari', 'Tanore', 'Mohanpur', 'Bagha', 'Charghat'],
      'Bogura':            ['Bogura Sadar', 'Shibganj', 'Gabtali', 'Sherpur', 'Nandigram', 'Kahalu'],
      'Chapainawabganj':   ['Chapainawabganj Sadar', 'Shibganj', 'Gomastapur', 'Nachole', 'Bholahat'],
      'Joypurhat':         ['Joypurhat Sadar', 'Akkelpur', 'Kalai', 'Khetlal', 'Panchbibi'],
      'Naogaon':           ['Naogaon Sadar', 'Atrai', 'Raninagar', 'Manda', 'Niamatpur', 'Badalgachhi'],
      'Natore':            ['Natore Sadar', 'Baraigram', 'Gurudaspur', 'Lalpur', 'Singra'],
      'Pabna':             ['Pabna Sadar', 'Ishwardi', 'Atgharia', 'Bera', 'Bhangura', 'Chatmohar'],
      'Sirajganj':         ['Sirajganj Sadar', 'Ullapara', 'Shahjadpur', 'Kazipur', 'Belkuchi', 'Raiganj'],
    }
  },
  'Khulna': {
    districts: {
      'Khulna':    ['Khulna Sadar', 'Dumuria', 'Batiaghata', 'Dacope', 'Paikgachha', 'Koyra'],
      'Bagerhat':  ['Bagerhat Sadar', 'Mongla', 'Fakirhat', 'Mollahat', 'Kachua', 'Morrelganj'],
      'Satkhira':  ['Satkhira Sadar', 'Assasuni', 'Debhata', 'Kalaroa', 'Kaliganj', 'Shyamnagar'],
      'Jessore':   ['Jessore Sadar', 'Abhaynagar', 'Bagherpara', 'Chaugachha', 'Jhikargacha', 'Manirampur'],
      'Jhenaidah': ['Jhenaidah Sadar', 'Harinakunda', 'Kaliganj', 'Kotchandpur', 'Maheshpur', 'Shailkupa'],
      'Kushtia':   ['Kushtia Sadar', 'Kumarkhali', 'Khoksa', 'Mirpur', 'Daulatpur', 'Bheramara'],
      'Magura':    ['Magura Sadar', 'Mohammadpur', 'Shalikha', 'Sreepur'],
      'Meherpur':  ['Meherpur Sadar', 'Gangni', 'Mujibnagar'],
      'Narail':    ['Narail Sadar', 'Lohagara', 'Kalia'],
    }
  },
  'Barishal': {
    districts: {
      'Barishal':   ['Barishal Sadar', 'Agailjhara', 'Babuganj', 'Bakerganj', 'Banaripara', 'Gaurnadi', 'Hizla'],
      'Bhola':      ['Bhola Sadar', 'Burhanuddin', 'Char Fasson', 'Daulatkhan', 'Lalmohan', 'Manpura'],
      'Jhalokati':  ['Jhalokati Sadar', 'Kathalia', 'Nalchity', 'Rajapur'],
      'Patuakhali': ['Patuakhali Sadar', 'Bauphal', 'Dashmina', 'Galachipa', 'Kalapara', 'Mirzaganj'],
      'Pirojpur':   ['Pirojpur Sadar', 'Bhandaria', 'Kawkhali', 'Mathbaria', 'Nazirpur', 'Nesarabad'],
      'Barguna':    ['Barguna Sadar', 'Amtali', 'Bamna', 'Betagi', 'Patharghata', 'Taltali'],
    }
  },
  'Sylhet': {
    districts: {
      'Sylhet':      ['Sylhet Sadar', 'Beanibazar', 'Bishwanath', 'Companiganj', 'Fenchuganj', 'Golapganj', 'Jaintiapur'],
      'Moulvibazar': ['Moulvibazar Sadar', 'Barlekha', 'Juri', 'Kamalganj', 'Kulaura', 'Rajnagar', 'Sreemangal'],
      'Habiganj':    ['Habiganj Sadar', 'Ajmiriganj', 'Baniachong', 'Bahubal', 'Chunarughat', 'Lakhai', 'Madhabpur', 'Nabiganj'],
      'Sunamganj':   ['Sunamganj Sadar', 'Bishwamvarpur', 'Chhatak', 'Derai', 'Dharampasha', 'Dowarabazar', 'Jagannathpur', 'Jamalganj'],
    }
  },
  'Rangpur': {
    districts: {
      'Rangpur':     ['Rangpur Sadar', 'Badarganj', 'Gangachara', 'Kaunia', 'Mithapukur', 'Pirgachha', 'Pirganj', 'Taraganj'],
      'Dinajpur':    ['Dinajpur Sadar', 'Birampur', 'Birganj', 'Biral', 'Bochaganj', 'Chirirbandar', 'Fulbari', 'Ghoraghat', 'Hakimpur', 'Kaharole', 'Khansama', 'Nawabganj', 'Parbatipur'],
      'Gaibandha':   ['Gaibandha Sadar', 'Fulchhari', 'Gobindaganj', 'Palashbari', 'Sadullapur', 'Saghata', 'Sundarganj'],
      'Kurigram':    ['Kurigram Sadar', 'Bhurungamari', 'Char Rajibpur', 'Chilmari', 'Phulbari', 'Nageshwari', 'Rajarhat', 'Raumari', 'Ulipur'],
      'Lalmonirhat': ['Lalmonirhat Sadar', 'Aditmari', 'Hatibandha', 'Kaliganj', 'Patgram'],
      'Nilphamari':  ['Nilphamari Sadar', 'Domar', 'Dimla', 'Jaldhaka', 'Kishoreganj', 'Saidpur'],
      'Panchagarh':  ['Panchagarh Sadar', 'Atwari', 'Boda', 'Debiganj', 'Tetulia'],
      'Thakurgaon':  ['Thakurgaon Sadar', 'Baliadangi', 'Haripur', 'Pirganj', 'Ranisankail'],
    }
  },
  'Mymensingh': {
    districts: {
      'Mymensingh': ['Mymensingh Sadar', 'Bhaluka', 'Dhobaura', 'Fulbaria', 'Gaffargaon', 'Gauripur', 'Haluaghat', 'Ishwarganj', 'Muktagachha', 'Nandail', 'Phulpur', 'Trishal'],
      'Jamalpur':   ['Jamalpur Sadar', 'Baksiganj', 'Dewanganj', 'Islampur', 'Madarganj', 'Melandaha', 'Sarishabari'],
      'Netrokona':  ['Netrokona Sadar', 'Atpara', 'Barhatta', 'Durgapur', 'Kalmakanda', 'Khaliajuri', 'Kendua', 'Madan', 'Mohanganj', 'Purbadhala'],
      'Sherpur':    ['Sherpur Sadar', 'Jhenaigati', 'Nakla', 'Nalitabari', 'Sreebardi'],
    }
  },
};

export default function StepTwo({ data, onChange, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  const divisions = Object.keys(LOCATIONS);
  const districts = data.division ? Object.keys(LOCATIONS[data.division].districts) : [];
  const upazilas  = data.division && data.district
    ? LOCATIONS[data.division].districts[data.district] || []
    : [];

  const handleDivisionChange = div =>
    onChange({ ...data, division: div, district: '', upazila: '' });

  const handleDistrictChange = district =>
    onChange({ ...data, district, upazila: '' });

  const validate = () => {
    const e = {};
    if (!data.division) e.division = 'Please select a division';
    if (!data.district) e.district = 'Please select a district';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate()) onNext(); };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Your Location</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select your division, district and upazila for a location-specific plan.
        </p>
      </div>

      {/* ── Division ─────────────────────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Division <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {divisions.map(div => {
            const isSelected = data.division === div;
            return (
              <button
                key={div}
                type="button"
                onClick={() => handleDivisionChange(div)}
                className={`
                  py-2.5 px-4 rounded-lg border-2 text-sm font-medium text-left transition-all
                  ${isSelected
                    ? 'border-primary bg-muted text-primary'
                    : 'border-border bg-card text-card-foreground hover:border-ring'}
                `}
              >
                {div}
              </button>
            );
          })}
        </div>
        {errors.division && <p className="text-destructive text-xs mt-1">{errors.division}</p>}
      </div>

      {/* ── District ─────────────────────────────────────────────────────── */}
      {districts.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            District <span className="text-destructive">*</span>
          </label>
          <select
            value={data.district}
            onChange={e => handleDistrictChange(e.target.value)}
            className="w-full border border-input bg-card text-card-foreground
                       rounded-lg px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">— Select District —</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          {errors.district && <p className="text-destructive text-xs mt-1">{errors.district}</p>}
        </div>
      )}

      {/* ── Upazila ──────────────────────────────────────────────────────── */}
      {upazilas.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Upazila <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <select
            value={data.upazila}
            onChange={e => onChange({ ...data, upazila: e.target.value })}
            className="w-full border border-input bg-card text-card-foreground
                       rounded-lg px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">— Select Upazila —</option>
            {upazilas.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      )}

      {/* ── Location summary ─────────────────────────────────────────────── */}
      {data.district && (
        <div className="bg-muted border border-border rounded-lg p-3 flex items-center gap-2 text-sm text-foreground">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          {[data.upazila, data.district, data.division].filter(Boolean).join(', ')}
        </div>
      )}

      {/* ── Navigation ───────────────────────────────────────────────────── */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border-2 border-border text-foreground font-semibold
                     py-3 rounded-lg hover:bg-muted transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground
                     font-semibold py-3 rounded-lg transition-colors"
        >
          Next → Land Details
        </button>
      </div>
    </div>
  );
}