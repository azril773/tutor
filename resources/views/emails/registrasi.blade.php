<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pemberitahuan Registrasi Berhasil</title>
    <style>
        
        body {
            font-family: Arial, sans-serif !important;
            background-color: #f4f4f4 !important;
            margin: 0 !important;
            padding: 0 !important;
            color: #333 !important; 
        }
        .container {
            max-width: 600px !important;
            margin: 20px auto !important;
            background-color: #ffffff !important;
            border: 1px solid #ddd !important;
            border-radius: 8px !important;
            overflow: hidden !important;
        }
        .header {
            background-color: #28a745 !important;
            color: #ffffff !important;
            padding: 20px !important;
            text-align: center !important;
        }
        .header img {
            max-width: 150px !important;
            height: auto !important;
            display: block !important;
            margin: 0 auto 10px auto !important;
        }
        .header h1 {
            margin: 0 !important;
            font-size: 24px !important;
        }
        .content {
            padding: 20px !important;
            color: #333 !important; 
            line-height: 1.6 !important;
            font-style: normal !important; 
            font-weight: normal !important;
            text-align: left !important; 
            margin: 0 !important; 
        }
        .content p {
            margin: 10px 0 !important;
            padding: 0 !important; 
            color: #333 !important;
            font-style: normal !important;
        }
        .credentials {
            background-color: #f8f9fa !important;
            padding: 15px !important;
            border-left: 4px solid #28a745 !important;
            margin: 20px 0 !important;
            color: #333 !important;
            font-style: normal !important;
        }
        .credentials p {
            margin: 5px 0 !important;
            font-weight: bold !important;
            color: #333 !important;
        }
        .footer {
            background-color: #f8f9fa !important;
            padding: 15px !important;
            text-align: center !important;
            font-size: 14px !important;
            color: #666 !important;
            border-top: 1px solid #ddd !important;
            font-style: normal !important;
        }
        .highlight {
            font-weight: bold !important;
            color: #28a745 !important;
        }
        
        blockquote, .gmail_quote, .yahoo_quoted, .outlook_quote {
            border-left: none !important;
            padding-left: 0 !important;
            margin-left: 0 !important;
            color: #333 !important;
            font-style: normal !important;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="{{ $logoUrl }}" alt="Logo UIN Siber Syekh Nurjati Cirebon">
            <h1>Registrasi Berhasil!</h1>
        </div>
        <div class="content">
            <p>Yth. {{ $name }},</p>
            <p>Assalamu’alaikum Wr. Wb.</p> <!-- Pastikan tidak ada simbol > atau indentasi -->
            <p>Selamat! Registrasi Anda sebagai Tutor Online pada Program Studi Pendidikan Jarak Jauh (PJJ) UPT PJJ UIN Siber Sykeh Nurjati Cirebon telah berhasil.</p>
            <p>Berikut adalah detail akun Anda untuk akses sistem:</p>
            <div class="credentials">
                <p>Email: <span class="highlight">{{ $email }}</span></p>
                <p>Password: <span class="highlight">{{ $password }}</span></p>
            </div>
            <p>Silakan login ke sistem menggunakan email dan password di atas. Kami sarankan untuk mengubah password setelah login pertama kali demi keamanan akun.</p>
            <p>Jika ada pertanyaan, hubungi kami di [kontak panitia].</p>
            <p>Terima kasih atas partisipasi Anda.</p>
            <p>Wassalamu’alaikum Wr. Wb.</p>
        </div>
        <div class="footer">
            <p><strong>UPT Pendidikan Jarak Jauh</strong><br>
            UIN Siber Syekh Nurjati Cirebon</p>
        </div>
    </div>
</body>
</html>
