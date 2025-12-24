<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pemberitahuan Tidak Lolos Seleksi</title>
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
            background-color: #dc3545 !important; 
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
            color: #dc3545 !important; 
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
            <h1>Maaf, Anda Tidak Lolos Seleksi Tutor Online</h1>
        </div>
        <div class="content">
            <p>Yth. {{ $namaLengkap }},</p>
            <p>Assalamu’alaikum Wr. Wb.</p>
            <p>Dengan segala horamat, kami mohon maaf belum bisa merekrut bapak/ibu pada semester ini dikarenakan kuota untuk tutor yang sudah terpenuhi. Namun,  Jika tutor yang mengampu tidak bisa memenuhi kewajiban , kami akan merekomendasikan bapak/ibu sebagai penggantinya</p>
            <p>Terima kasih atas partisipasi dan antusiasme Anda dalam mengikuti seleksi ini. Kami berharap dapat bekerja sama di lain waktu.</p>
            <p>Wassalamu’alaikum Wr. Wb.</p>
        </div>
        <div class="footer">
            <p><strong>UPT Pendidikan Jarak Jauh</strong><br>
            UIN Siber Syekh Nurjati Cirebon</p>
        </div>
    </div>
</body>
</html>
