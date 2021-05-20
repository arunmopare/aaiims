import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:qr_code_scanner_example/components/rounded_button.dart';
import 'package:qr_code_scanner_example/constants.dart';
import 'package:qr_code_scanner_example/models/http-exception.dart';
import 'package:qr_code_scanner_example/page/add_report_page.dart';
import 'package:qr_code_scanner_example/providers/product-report.dart';

var _isInit = true;
var _isLoading = false;

class ProductPage extends StatefulWidget {
  final String _qrCode;
  ProductPage(this._qrCode);

  @override
  _ProductPageState createState() => _ProductPageState();
}

class _ProductPageState extends State<ProductPage> {
  @override
  void didChangeDependencies() {
    print('Inside did change is init' + _isInit.toString());
    if (_isInit) {
      setState(() {
        _isLoading = true;
      });
      Provider.of<ProductReport>(context)
          .getProductReport(widget._qrCode)
          .then((value) {
        setState(() {
          _isLoading = false;
        });
      }).catchError((error) {
        setState(() {
          _isLoading = false;
        });
        showDialog(
          context: context,
          builder: (ctx) => AlertDialog(
            title: Text('Error'),
            content: Text('No Products Found'),
            actions: [
              ElevatedButton(
                child: Text('Ok'),
                onPressed: () {
                  Navigator.of(ctx).pop();
                },
              ),
            ],
          ),
        );
      });
    }
    _isInit = false;
    super.didChangeDependencies();
  }

  Future<void> _pullRefresh(BuildContext context) async {
    try {
      setState(() {
        _isLoading = true;
      });
      final data = await Provider.of<ProductReport>(context, listen: false)
          .getProductReport(widget._qrCode);
      setState(() {
        _isLoading = false;
      });
    } on HttpException catch (error) {
      setState(() {
        _isLoading = false;
      });
      await showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text('Error'),
          content: Text('No Products Found'),
          actions: [
            ElevatedButton(
              child: Text('Ok'),
              onPressed: () {
                Navigator.of(ctx).pop();
              },
            ),
          ],
        ),
      );
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
      print(e.toString());
      await showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text('Error'),
          content: Text('No Products Found'),
          actions: [
            ElevatedButton(
              child: Text('Ok'),
              onPressed: () {
                Navigator.of(ctx).pop();
              },
            ),
          ],
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    // Provider.of<ProductReport>(context).emptyList();
    final productsData = Provider.of<ProductReport>(context, listen: false);
    print('object');
    print(productsData.items);

    final rows = <DataRow>[];
    if (productsData.items.length > 0) {
      for (var i = 0; i < productsData.items.length; i++) {
        rows.add(new DataRow(cells: <DataCell>[
          DataCell(Text((i + 1).toString())),
          DataCell(Text(productsData.items[i].date)),
          DataCell(Text(productsData.items[i].report)),
          DataCell(Text(productsData.items[i].maintenanceBy)),
        ]));
      }
    }

    return Scaffold(
        appBar: AppBar(
          title: Text('Product Report'),
          actions: [
            new IconButton(
                icon: new Icon(Icons.add),
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (BuildContext context) =>
                          AddProductReport(widget._qrCode),
                    ),
                  );
                }),
          ],
          leading: new IconButton(
              icon: new Icon(Icons.arrow_back),
              onPressed: () {
                Navigator.pop(context, true);
              }),
        ),
        body: _isLoading
            ? Center(child: CircularProgressIndicator())
            : RefreshIndicator(
                onRefresh: () => _pullRefresh(context),
                child: ListView(
                  children: <Widget>[
                    Padding(
                      padding: EdgeInsets.all(20),
                      child: RoundedButton(
                        text: 'Add Product Report',
                        color: kPrimaryColor,
                        press: () => Navigator.of(context).push(
                            MaterialPageRoute(
                                builder: (BuildContext context) =>
                                    AddProductReport(widget._qrCode))),
                      ),
                    ),
                    Center(
                        child: Text(
                      'Product-Report',
                      style:
                          TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
                    )),
                    DataTable(
                      columns: [
                        DataColumn(
                            label: Text('ID',
                                style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold))),
                        DataColumn(
                            label: Text('Date',
                                style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold))),
                        DataColumn(
                            label: Text('Report',
                                style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold))),
                        DataColumn(
                            label: Text('By',
                                style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold))),
                      ],
                      rows: rows,
                    ),
                  ],
                ),
              ));
  }
}
