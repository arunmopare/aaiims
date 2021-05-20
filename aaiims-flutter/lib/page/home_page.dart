import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:qr_code_scanner_example/components/rounded_button.dart';
import 'package:qr_code_scanner_example/constants.dart';
import 'package:qr_code_scanner_example/main.dart';
import 'package:qr_code_scanner_example/page/auth_screen.dart';
import 'package:qr_code_scanner_example/page/qr_create_page.dart';
import 'package:qr_code_scanner_example/page/qr_scan_page.dart';
import 'package:qr_code_scanner_example/providers/auth.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Center(child: Text('AAIIMS Home')),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Center(
              child: Text(
                'Please choose options from below.',
                style: (TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.normal,
                  color: Colors.red,
                )),
              ),
            ),
            // RoundedButton(
            //   text: 'Create QR Code',
            //   color: kPrimaryColor,
            //   press: () => Navigator.of(context).push(MaterialPageRoute(
            //       builder: (BuildContext context) => QRCreatePage())),
            // ),
            const SizedBox(height: 32),
            RoundedButton(
              text: 'Scan QR Code',
              color: kPrimaryColor,
              press: () => Navigator.of(context).push(MaterialPageRoute(
                  builder: (BuildContext context) => QRScanPage())),
            ),
            const SizedBox(height: 32),
            RoundedButton(
              text: 'Logout',
              color: Colors.red,
              press: () async {
                await Provider.of<Auth>(context, listen: false).logout();
                Navigator.of(context).pushReplacementNamed(MyApp.routeName);
              },
            ),
          ],
        ),
      ),
    );
  }
}
