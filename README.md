

# 📝 Node.js + Fastify + PostgreSQL MVC Blog Projesi

Bu proje, **Fastify** çerçevesiyle geliştirilen, veritabanı olarak **PostgreSQL** kullanan ve yazılım mimarisi olarak **MVC** (Model-View-Controller) yapısını benimseyen modern bir blog platformudur.

## 📂 Proje Yapısı

```plaintext
├── controllers/
│   ├── postController.js
├── models/
│   ├── postModel.js
├── routes/
│   ├── postRoutes.js
├── views/
│   ├── index.ejs
├── config/
│   ├── db.js
├── app.js
└── package.json
```

- **controllers/**: Blog yazıları gibi iş mantığını içeren dosyalar.
- **models/**: PostgreSQL sorgularını içeren modeller.
- **routes/**: API rotalarını yöneten dosyalar.
- **views/**: Blog arayüzünü oluşturan şablonlar (EJS ile).
- **config/**: PostgreSQL bağlantı ayarlarını içeren dosyalar.

## 🔧 Kurulum

### 1. Gerekli Paketlerin Kurulumu
```bash
npm install
```

### 2. Veritabanı Ayarları
`config/db.js` dosyasında PostgreSQL bağlantı bilgilerinizi yapılandırın:
```javascript
const { Pool } = require('pg');
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

module.exports = pool;
```

### 3. Veritabanı Migrasyonları
Veritabanı tablolarını oluşturmak için gerekli sorguları çalıştırın.

### 4. Sunucuyu Başlatma
Projeyi çalıştırmak için:
```bash
node app.js
```

### 5. Örnek Kullanım Adresi
Proje varsayılan olarak şu adreste çalışır:
```
http://localhost:3000/
```

## 🎯 Özellikler

### Blog İşlevleri
- **Yazı Listeleme**: Tüm blog yazılarını kategorilere göre görüntüleme.
- **Yazı Detayı**: Bir yazının detaylı içeriğini görme.
- **Yazı Yayınlama**: Yeni bir blog yazısı ekleme.
- **Yazı Güncelleme**: Mevcut bir yazıyı düzenleme.
- **Yazı Silme**: İstenmeyen yazıları kaldırma.

### Diğer Özellikler
- **Kategori Yönetimi**: Blog yazılarını kategorilere ayırma.
- **SEO Uyumlu URL’ler**: Daha iyi arama motoru sonuçları için optimize edilmiş rotalar.
- **Temiz Kod Yapısı**: MVC mimarisi ile kolay genişletilebilirlik.
- **Dinamik Şablonlar**: EJS (Embedded JavaScript) ile dinamik ve etkileyici görseller.

## 🖥️ Teknolojiler

- **Node.js**: Sunucu taraflı JavaScript çalıştırma.
- **Fastify**: Hızlı ve optimize web çerçevesi.
- **PostgreSQL**: Güçlü ve ölçeklenebilir bir ilişkisel veritabanı yönetim sistemi.
- **MVC Mimari**: Modüler ve düzenli yapı.
- **EJS**: Şablon motoru.

## 📄 Lisans
Bu proje açık kaynaklıdır ve MIT lisansı ile sunulmaktadır.

## 📫 İletişim

Herhangi bir sorunuz veya geri bildiriminiz varsa, benimle iletişime geçmekten çekinmeyin:

- **GitHub:** [ebuenesy2](https://github.com/ebuenesy2)  
- **Email:** ebuenesy2@gmail.com  
- **LinkedIn:** [Ebu Enes Yıldırım](https://www.linkedin.com/in/ebuenesyildirim/)

