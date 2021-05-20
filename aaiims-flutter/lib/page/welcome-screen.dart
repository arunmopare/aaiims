import 'package:flutter/material.dart';
import 'package:qr_code_scanner_example/components/rounded_button.dart';
import 'package:qr_code_scanner_example/constants.dart';
import 'package:qr_code_scanner_example/main.dart';
import 'package:qr_code_scanner_example/page/auth_screen.dart';
import 'package:qr_code_scanner_example/widget/background-image.dart';

class WelComeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final deviceSize = MediaQuery.of(context).size;

    return Stack(
      children: [
        BackgroundImage(),
        Scaffold(
          backgroundColor: Colors.transparent,
          body: SingleChildScrollView(
            child: SafeArea(
              child: Column(
                children: [
                  Center(
                      child: Column(
                    children: [
                      SizedBox(
                        height: deviceSize.height * 0.05,
                      ),
                      Text(
                        'Welcome to',
                        style: TextStyle(
                          fontSize: 30,
                          color: Colors.white,
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.all(20),
                        child: Text(
                          'Airport Inventory Management',
                          style: TextStyle(
                            fontSize: 40,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ],
                  )),
                  SizedBox(
                    height: deviceSize.height * 0.25,
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 40),
                    child: Column(
                      children: [
                        Column(
                          children: [
                            SizedBox(
                              height: 100,
                            ),
                            SizedBox(
                              height: 80,
                            ),
                            Container(
                              child: RoundedButton(
                                text: 'Login',
                                color: kPrimaryColor,
                                press: () {
                                  Navigator.of(context).push(MaterialPageRoute(
                                      builder: (BuildContext context) =>
                                          AuthScreen()));
                                },
                              ),
                            ),
                            SizedBox(
                              height: 30,
                            ),
                          ],
                        )
                      ],
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}
