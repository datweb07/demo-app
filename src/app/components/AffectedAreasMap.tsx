import React, { JSX } from 'react';
import { Skull, AlertTriangle, ThumbsUp, ExternalLink, Thermometer, Droplets, Wind, BarChart, Calendar, Clock } from 'lucide-react';
import { GoogleMap, useLoadScript, Marker, Circle } from '@react-google-maps/api';

interface AffectedArea {
  province: string;
  salinity: number;
  status: 'safe' | 'warning' | 'danger';
}

interface AffectedAreasMapProps {
  areas: AffectedArea[];
}

const provinceCoords: Record<string, { lat: number; lng: number }> = {
  'Bến Tre': { lat: 10.15, lng: 106.37 },
  'Trà Vinh': { lat: 9.97, lng: 106.34 },
  'Sóc Trăng': { lat: 9.60, lng: 105.97 },
  'Cà Mau': { lat: 9.17, lng: 105.15 },
  'Kiên Giang': { lat: 10.02, lng: 105.44 },
  'An Giang': { lat: 10.53, lng: 105.38 },
  'Đồng Tháp': { lat: 10.71, lng: 105.64 },
  'Vĩnh Long': { lat: 10.25, lng: 105.97 },
  'Cần Thơ': { lat: 10.03, lng: 105.77 },
  'Hậu Giang': { lat: 9.78, lng: 105.73 },
  'Bạc Liêu': { lat: 9.29, lng: 106.58 },
  'Long An': { lat: 10.72, lng: 106.16 },
  'Tiền Giang': { lat: 10.41, lng: 106.15 },
};

const statusColor = (status: string) => {
  if (status === 'danger') return '#ef4444';
  if (status === 'warning') return '#f59e0b';
  return '#10b981';
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'danger':
      return <Skull className="w-6 h-6 text-white" />;
    case 'warning':
      return <AlertTriangle className="w-6 h-6 text-white" />;
    case 'safe':
      return <ThumbsUp className="w-6 h-6 text-white" />;
    default:
      return <ThumbsUp className="w-6 h-6 text-white" />;
  }
};

// Dữ liệu bài báo chính thống
const officialReports = [
  {
    id: 1,
    title: 'Bản tin dự báo ranh mặn tuần 15-21/12/2024',
    source: 'SIWRR - Viện Khoa học Thủy lợi Miền Nam',
    url: 'https://siwrr.org.vn/du-bao-nguon-nuoc',
    date: '14/12/2024',
    data: {
      temperature: '28-32°C',
      humidity: '65-80%',
      salinity: '4-6‰',
      rainfall: '15-25mm',
      windSpeed: '10-15 km/h'
    },
    highlights: [
      'Ranh mặn 1g/l xâm nhập sâu 40-50km',
      'Cống Cái Lớn mở cửa tháo lũ',
      'Đề xuất hạn chế lấy nước từ sông chính'
    ]
  },
  {
    id: 2,
    title: 'Dự báo hạn mặn mùa khô 2024-2025',
    source: 'NCHMF - Trung tâm Dự báo Khí tượng Thủy văn Quốc gia',
    url: 'https://nchmf.gov.vn',
    date: '10/12/2024',
    data: {
      temperature: '29-34°C',
      humidity: '60-75%',
      salinity: '5-7‰',
      rainfall: '10-20mm',
      elNino: 'Đang hoạt động mạnh'
    },
    highlights: [
      'Đỉnh mặn cao nhất vào tháng 3-4/2025',
      'Lưu lượng nước về thấp hơn trung bình 20%',
      'Cảnh báo hạn mặn nghiêm trọng khu vực ven biển'
    ]
  },
  {
    id: 3,
    title: 'Long An công bố xâm nhập mặn khẩn cấp',
    source: 'VNEXPRESS - Báo điện tử',
    url: 'https://vnexpress.net/long-an-cong-bo-xam-nhap-man-khan-cap-4735647.html',
    date: '17/04/2024',
    data: {
      waterLevel: '8.2m',
      discharge: '3500 m³/s',
      change: 'Giảm 15% so với tuần trước',
      temperature: '27°C',
      tide: 'Chế độ bán nhật triều'
    },
    highlights: [
    "Tỉnh Long An chính thức công bố rủi ro thiên tai xâm nhập mặn ở cấp độ cao nhất (cấp 4).",
    "Nước mặn (4‰) đã xâm nhập sâu vào hệ thống sông chính, ảnh hưởng trực tiếp đến nguồn nước sinh hoạt.",
    "Hơn 20.000 người dân đang bị thiếu nước sinh hoạt do hạn mặn kéo dài.",
    "Tỉnh đã đề xuất ngân sách lớn cho các biện pháp cấp bách như nạo vét kênh, lắp trạm bơm, cung cấp nước sạch.",
    "Đây là tỉnh thứ ba ở ĐBSCL (sau Tiền Giang và Cà Mau) công bố tình trạng khẩn cấp về xâm nhập mặn trong mùa khô năm nay."
  ]
  },
  {
    id: 4,
    title: 'Chỉ số ONI tháng 11/2024: +1.2°C',
    source: 'CPC/NCEP - NOAA',
    url: 'https://cpc.ncep.noaa.gov',
    date: '08/12/2024',
    data: {
      oniIndex: '+1.2°C',
      status: 'El Niño mạnh',
      forecast: 'Duy trì đến Q2/2025',
      impact: 'Hạn hán và xâm nhập mặn nghiêm trọng'
    },
    highlights: [
      'El Niño đang ở giai đoạn cực đại',
      'Dự báo ảnh hưởng đến hết mùa khô',
      'Cần chuẩn bị ứng phó hạn mặn kéo dài'
    ]
  },
  {
    id: 5,
    title: 'Bản đồ độ ẩm đất ĐBSCL tháng 12',
    source: 'SERVIR-Mekong - ADPC',
    url: 'https://servir.adpc.net',
    date: '12/12/2024',
    data: {
      soilMoisture: '35-45%',
      vegetation: 'Khỏe mạnh 70%',
      drought: 'Bình thường',
      recommendation: 'Tưới bổ sung cho cây trồng'
    },
    highlights: [
      'Độ ẩm đất thấp ở vùng ven biển',
      'Cây lúa đang phát triển tốt',
      'Cần giám sát độ ẩm đất chặt chẽ'
    ]
  },
  {
    id: 6,
    title: 'Báo cáo vận hành các cống lớn',
    source: 'Cục Thủy lợi',
    url: 'https://tongcucthuyloi.gov.vn',
    date: '15/12/2024',
    data: {
      caoLanh: 'Đóng cửa',
      caiLon: 'Mở 50%',
      ninhQuoi: 'Đóng cửa',
      vamCo: 'Mở 30%',
      waterStorage: '85% công suất'
    },
    highlights: [
      'Cống Cái Lớn mở điều tiết nước',
      'Hồ chứa thượng nguồn đạt 80-90%',
      'Sẵn sàng ứng phó xâm nhập mặn'
    ]
  }
];

export function AffectedAreasMap({ areas }: AffectedAreasMapProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: apiKey });

  const sortedAreas = [...areas].sort((a, b) => b.salinity - a.salinity);
  const dangerAreas = sortedAreas.filter((a) => a.status === 'danger');
  const warningAreas = sortedAreas.filter((a) => a.status === 'warning');
  const safeAreas = sortedAreas.filter((a) => a.status === 'safe');

  const center = { lat: 10.0, lng: 105.8 };

  if (loadError) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
        <h3 className="font-bold text-xl text-gray-900 mb-4">Bản đồ</h3>
        <div className="text-red-600">Không thể tải bản đồ (kiểm tra khóa API)</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Bản đồ chính */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
        <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">🗺️</span>
          Bản đồ xâm nhập mặn theo tỉnh
        </h3>

        {/* Map */}
        <div className="mb-6 rounded-lg overflow-hidden">
          {!isLoaded ? (
            <div className="w-full h-64 bg-gray-50 flex items-center justify-center">Đang tải bản đồ…</div>
          ) : (
            <GoogleMap mapContainerStyle={{ width: '100%', height: '360px' }} center={center} zoom={8}>
              {areas.map((area) => {
                const coords = provinceCoords[area.province];
                if (!coords) return null;
                const color = statusColor(area.status);
                const radius = area.status === 'danger' ? 40000 : area.status === 'warning' ? 25000 : 15000;

                return (
                  <React.Fragment key={area.province}>
                    <Marker position={coords} />
                    <Circle
                      center={coords}
                      radius={radius}
                      options={{ strokeColor: color, fillColor: color, fillOpacity: 0.12, strokeWeight: 1 }}
                    />
                  </React.Fragment>
                );
              })}
            </GoogleMap>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-red-500 p-2 rounded-full">
                <Skull className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-red-700 mb-1">Nguy hiểm</p>
            <p className="text-3xl font-bold text-red-600">{dangerAreas.length}</p>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-yellow-500 p-2 rounded-full">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-yellow-700 mb-1">Cảnh báo</p>
            <p className="text-3xl font-bold text-yellow-600">{warningAreas.length}</p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-green-500 p-2 rounded-full">
                <ThumbsUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-green-700 mb-1">An toàn</p>
            <p className="text-3xl font-bold text-green-600">{safeAreas.length}</p>
          </div>
        </div>

        {/* Areas List */}
        <div className="space-y-3 max-h-72 overflow-y-auto mb-6">
          {sortedAreas.map((area) => (
            <div
              key={area.province}
              className={`flex items-center justify-between p-4 rounded-xl border-2 ${
                area.status === 'danger'
                  ? 'bg-red-50 border-red-200'
                  : area.status === 'warning'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`${area.status === 'danger' ? 'bg-red-500' : area.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'} p-2 rounded-full`}>
                  {getStatusIcon(area.status)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{area.province}</h4>
                  <p className="text-sm text-gray-600">{area.status === 'danger' ? 'Nguy hiểm' : area.status === 'warning' ? 'Cảnh báo' : 'An toàn'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{area.salinity}‰</p>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="pt-6 border-t-2 border-gray-200">
          <p className="text-sm text-gray-600 font-bold mb-3">Chú thích:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-green-500 p-1 rounded-full">
                <ThumbsUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">An toàn (&lt; 4‰)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-yellow-500 p-1 rounded-full">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">Cảnh báo (4-6‰)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-red-500 p-1 rounded-full">
                <Skull className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">Nguy hiểm (&gt; 6‰)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Các báo cáo chính thức */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
        <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
          <BarChart className="w-6 h-6 text-blue-600" />
          Dữ liệu dự báo từ cơ quan chuyên môn
        </h3>
        <p className="text-gray-600 mb-6">Thông tin được cập nhật từ các nguồn uy tín, giúp đưa ra dự báo chính xác</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {officialReports.map((report) => (
            <div 
              key={report.id} 
              className="border-2 border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-gray-900 text-lg leading-tight">{report.title}</h4>
                <a 
                  href={report.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                  title="Truy cập nguồn chính thức"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {report.date} • {report.source}
                </p>
              </div>

              {/* Thông số kỹ thuật */}
              <div className="mb-4 bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Thông số chính:</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(report.data).map(([key, value]) => {
                    const getIcon = (key: string) => {
                      const iconMap: Record<string, JSX.Element> = {
                        temperature: <Thermometer className="w-4 h-4 text-blue-600" />,
                        humidity: <Droplets className="w-4 h-4 text-blue-600" />,
                        salinity: <AlertTriangle className="w-4 h-4 text-blue-600" />,
                        rainfall: <Droplets className="w-4 h-4 text-blue-600" />,
                        windSpeed: <Wind className="w-4 h-4 text-blue-600" />,
                        waterLevel: <BarChart className="w-4 h-4 text-blue-600" />,
                        discharge: <Wind className="w-4 h-4 text-blue-600" />,
                        change: <BarChart className="w-4 h-4 text-blue-600" />,
                        tide: <Droplets className="w-4 h-4 text-blue-600" />,
                        oniIndex: <Thermometer className="w-4 h-4 text-blue-600" />,
                        status: <AlertTriangle className="w-4 h-4 text-blue-600" />,
                        forecast: <Calendar className="w-4 h-4 text-blue-600" />,
                        impact: <AlertTriangle className="w-4 h-4 text-blue-600" />,
                        soilMoisture: <Droplets className="w-4 h-4 text-blue-600" />,
                        vegetation: <Wind className="w-4 h-4 text-blue-600" />,
                        drought: <AlertTriangle className="w-4 h-4 text-blue-600" />,
                        recommendation: <Clock className="w-4 h-4 text-blue-600" />,
                        elNino: <Thermometer className="w-4 h-4 text-blue-600" />,
                        caoLanh: <BarChart className="w-4 h-4 text-blue-600" />,
                        caiLon: <BarChart className="w-4 h-4 text-blue-600" />,
                        ninhQuoi: <BarChart className="w-4 h-4 text-blue-600" />,
                        vamCo: <BarChart className="w-4 h-4 text-blue-600" />,
                        waterStorage: <Droplets className="w-4 h-4 text-blue-600" />
                      };
                      return iconMap[key] || <BarChart className="w-4 h-4 text-blue-600" />;
                    };

                    return (
                      <div key={key} className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded">
                          {getIcon(key)}
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
                          <p className="text-sm font-semibold text-gray-900">{value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Điểm nổi bật */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Điểm nổi bật:
                </p>
                <ul className="space-y-1">
                  {report.highlights.map((highlight, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <a 
                  href={report.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                >
                  Xem chi tiết trên {report.source.split(' - ')[0]}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tổng hợp dữ liệu */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
        <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
          <BarChart className="w-6 h-6 text-blue-600" />
          Tổng hợp dữ liệu từ các nguồn
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-5 border-2 border-blue-100">
            <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-orange-500" />
              Chỉ số khí hậu
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Chỉ số ONI</span>
                <span className="font-bold text-orange-600">+1.2°C (El Niño mạnh)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Nhiệt độ TB</span>
                <span className="font-bold text-gray-900">29-32°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Độ ẩm</span>
                <span className="font-bold text-gray-900">65-80%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-blue-100">
            <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              Thông số thủy văn
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Mực nước Kratie</span>
                <span className="font-bold text-blue-600">8.2m (-15%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Lưu lượng nước về</span>
                <span className="font-bold text-gray-900">3,500 m³/s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Độ ẩm đất</span>
                <span className="font-bold text-gray-900">35-45%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-blue-100">
            <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Dự báo xâm nhập mặn
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Độ mặn TB</span>
                <span className="font-bold text-red-600">4-6‰</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ranh mặn 1g/l</span>
                <span className="font-bold text-gray-900">40-50km</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Đỉnh mặn dự báo</span>
                <span className="font-bold text-red-600">Tháng 3-4/2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-blue-200">
          <p className="text-sm text-gray-600 mb-3">
            <span className="font-bold">Ghi chú:</span> Dữ liệu được tổng hợp từ các nguồn chính thống bao gồm SIWRR, NCHMF, Mekong Data Portal, NOAA, và các cơ quan chuyên môn khác.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">SIWRR</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">NCHMF</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Mekong Portal</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">NOAA</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">SERVIR</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Cục Thủy lợi</span>
          </div>
        </div>
      </div>
    </div>
  );
}