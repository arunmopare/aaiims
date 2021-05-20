import 'dart:convert';
import 'dart:ui';

import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:qr_code_scanner_example/constants.dart';
import 'package:qr_code_scanner_example/models/http-exception.dart';

class ProductReportItem {
  final String id;
  final String productName;
  final String report;
  final String maintenanceBy;
  final String date;
  ProductReportItem({
    @required this.id,
    @required this.productName,
    @required this.report,
    @required this.maintenanceBy,
    @required this.date,
  });
}

class ProductReport with ChangeNotifier {
  List<ProductReportItem> _items = [];

  Future<Exception> getProductReport(String productId) async {
    print('inside provider');
    final url = '$baseRouterUrl/api/report/mobile/$productId';

    try {
      final res = await http.get(url);
      if (res.statusCode == 400) {
        _items = [];
        notifyListeners();
        throw Exception('Something went Wrong');
      }
      print('RESBODY ' + res.body);
      final extractedData =
          json.decode(res.body.toString()) as Map<String, dynamic>;
      print('extractedData' + extractedData.toString());
      final List<ProductReportItem> loadedProductReports = [];

      extractedData.forEach((prodId, prodData) {
        print(prodId);
        loadedProductReports.add(
          ProductReportItem(
              id: prodData['_id'],
              productName: prodData['productName'],
              report: prodData['report'],
              maintenanceBy: prodData['maintenanceBy'],
              date: prodData['date']),
        );
      });
      if (_items.isNotEmpty) {
        print('_items.isNotEmpty' + _items.isNotEmpty.toString());
        _items.removeRange(0, _items.length - 1);
        notifyListeners();
      }

      _items = loadedProductReports;
      notifyListeners();

      print(res.body);
      print("STATUS CODE " + res.statusCode.toString());
    } catch (error) {
      print(error);
      notifyListeners();
      throw Exception();
    }
  }

  Future<HttpException> addProductReport(ProductReportItem report) async {
    print('REPORT TO BE POST' + report.id);
    print(report);
    // final url = Uri.https(
    //   "https://my-shop-48032-default-rtdb.firebaseio.com",
    //   "/products.json",
    // );
    final url = '$baseRouterUrl/api/report';
    try {
      final response = await http.post(
        url,
        body: {
          'productId': report.id,
          'maintenanceBy': report.maintenanceBy,
          'productName': report.productName,
          'report': report.report,
        },
      );
      print('Not Able to post Report' + response.body.toString());
      // final newProductReport = ProductReportItem(
      //   id: report.id,
      //   maintenanceBy: report.maintenanceBy,
      //   productName: report.productName,
      //   report: report.report,
      // );
      // _items.add(newProductReport);
      notifyListeners();
    } catch (error) {
      print(error);
      throw error;
    }

    // _items.add();
  }

  List<ProductReportItem> get items {
    // print([...items]);
    return [..._items];
  }

  void emptyList() {
    _items = [];
  }
}
