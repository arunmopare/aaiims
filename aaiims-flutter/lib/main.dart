import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:qr_code_scanner_example/components/rounded_button.dart';
import 'package:qr_code_scanner_example/constants.dart';
import 'package:qr_code_scanner_example/page/auth_screen.dart';
import 'package:qr_code_scanner_example/page/home_page.dart';
import 'package:qr_code_scanner_example/page/product_page.dart';
import 'package:qr_code_scanner_example/page/qr_create_page.dart';
import 'package:qr_code_scanner_example/page/qr_scan_page.dart';
import 'package:qr_code_scanner_example/page/welcome-screen.dart';
import 'package:qr_code_scanner_example/providers/auth.dart';
import 'package:qr_code_scanner_example/providers/product-report.dart';
import 'package:qr_code_scanner_example/widget/button_widget.dart';
import 'package:qr_code_scanner_example/widget/splash_screen_loading.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  static final String title = 'Airport Authority';
  static const routeName = 'root';

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (ctx) => Auth(),
        ),
        ChangeNotifierProvider(
          create: (ctx) => ProductReport(),
        ),
      ],
      child: Consumer<Auth>(
        builder: (ctx, auth, _) => MaterialApp(
          debugShowCheckedModeBanner: false,
          title: title,
          theme: ThemeData(
            primaryColor: kPrimaryColor,
            scaffoldBackgroundColor: Colors.white,
          ),
          home: auth.isAuth
              ? HomePage()
              : FutureBuilder(
                  future: auth.tryAutoLogin(),
                  builder: (ctx, authResultSnapShot) =>
                      authResultSnapShot.connectionState ==
                              ConnectionState.waiting
                          ? SplashScreenLoading()
                          : WelComeScreen(),
                ),
          routes: {
            AuthScreen.routeName: (ctx) => AuthScreen(),
            MyApp.routeName: (ctx) => MyApp()
          },
        ),
      ),
    );
  }
}
