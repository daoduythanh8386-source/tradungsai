const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultBox = document.getElementById('result');

// Dữ liệu mẫu dung sai
const data = [
  { tieuChuan: 'ISO 2768-mk', kichThuoc: '0-6mm', dungSai: '±0.1mm' },
  { tieuChuan: 'ISO 2768-mk', kichThuoc: '6-30mm', dungSai: '±0.2mm' },
  { tieuChuan: 'ISO 2768-mk', kichThuoc: '30-120mm', dungSai: '±0.3mm' },
  { tieuChuan: 'GB/T 1804-m', kichThuoc: '0.5-3mm', dungSai: '±0.1mm' },
  { tieuChuan: 'GB/T 1804-m', kichThuoc: '3-6mm', dungSai: '±0.15mm' }
];

searchBtn.addEventListener('click', searchData);
searchInput.addEventListener('keypress', (e) => e.key === 'Enter' && searchData());

function searchData() {
  const keyword = searchInput.value.trim().toLowerCase();
  
  if (!keyword) {
    resultBox.innerHTML = '<p style="color:red">Vui lòng nhập từ khóa tìm kiếm!</p>';
    return;
  }

  const results = data.filter(item => 
    item.tieuChuan.toLowerCase().includes(keyword) ||
    item.kichThuoc.includes(keyword)
  );

  if (results.length === 0) {
    resultBox.innerHTML = `<p>Không tìm thấy dữ liệu cho: <strong>${keyword}</strong></p>`;
    return;
  }

  resultBox.innerHTML = results.map(item => `
    <div style="margin-bottom:10px; padding:8px; background:white; border-radius:4px;">
      <strong>${item.tieuChuan}</strong><br>
      Kích thước: ${item.kichThuoc}<br>
      Dung sai cho phép: <span style="color:#667eea; font-weight:bold">${item.dungSai}</span>
    </div>
  `).join('');
}
