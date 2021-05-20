import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:qr_code_scanner_example/page/product_page.dart';
import 'package:qr_code_scanner_example/widget/button_widget.dart';

import '../main.dart';

class QRScanPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _QRScanPageState();
}

class _QRScanPageState extends State<QRScanPage> {
  String qrCode = '';
  String message = '';
  Color msgClr = Colors.red;

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: Text(MyApp.title),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                'Scan Result',
                style: TextStyle(
                  fontSize: 16,
                  color: Colors.black,
                  fontWeight: FontWeight.normal,
                ),
              ),
              SizedBox(height: 8),
              Text(
                '$message',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: msgClr,
                ),
              ),
              SizedBox(height: 72),
              ButtonWidget(
                text: 'Start QR scan',
                onClicked: () => scanQRCode(context),
              ),
            ],
          ),
        ),
      );

  Future<void> scanQRCode(BuildContext context) async {
    try {
      final qrCode = await FlutterBarcodeScanner.scanBarcode(
        '#ff6666',
        'Cancel',
        true,
        ScanMode.QR,
      );

      if (!mounted) return;
      if (qrCode.length == 24) {
        setState(() {
          this.message = 'Valid QR Code';
          Navigator.of(context).push(MaterialPageRoute(
              builder: (BuildContext context) => ProductPage(qrCode)));
        });
      } else {
        setState(() {
          this.message = 'Invalid QR Code';
        });
      }
    } on PlatformException {
      message = 'Failed to get platform version.';
    }
  }
}
