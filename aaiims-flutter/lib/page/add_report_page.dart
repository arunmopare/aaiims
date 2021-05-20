import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:qr_code_scanner_example/providers/product-report.dart';

class AddProductReport extends StatefulWidget {
  final String _productId;
  AddProductReport(this._productId);
  @override
  _AddProductReportState createState() => _AddProductReportState();
}

class _AddProductReportState extends State<AddProductReport> {
  final _productNameFocusNode = FocusNode();
  final _reportFocusNode = FocusNode();
  final _manageByFocusNode = FocusNode();
  final _descriptionFocusNode = FocusNode();

  final _form = GlobalKey<FormState>();
  var _isInit = true;
  var _editedProductReport = ProductReportItem(
    id: null,
    productName: '',
    report: '',
    maintenanceBy: '',
  );
  var initValues = {
    'productName': '',
    'report': '',
    'maintenanceBy': '',
  };
  var _isLoading = false;
  @override
  void dispose() {
    _descriptionFocusNode.dispose();
    _productNameFocusNode.dispose();
    super.dispose();
  }

  Future<void> _saveForm() async {
    final isValid = _form.currentState.validate();
    if (!isValid) {
      return;
    }
    setState(() {
      _isLoading = true;
    });
    _form.currentState.save();

    try {
      await Provider.of<ProductReport>(context, listen: false)
          .addProductReport(_editedProductReport);
    } catch (error) {
      await showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text('An error occurred'),
          content: Text('Something went wrong'),
          actions: [
            FlatButton(
              onPressed: () {
                setState(() {
                  _isLoading = false;
                });
                Navigator.of(context).pop();
              },
              child: Text('Ok'),
            )
          ],
        ),
      );
    } finally {
      setState(() {
        _isLoading = false;
      });
      Navigator.of(context).pop();
    }
  }

  // print(_editedProduct.title);
  // print(_editedProduct.price);
  // print(_editedProduct.description);
  // print(_editedProduct.imageUrl);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add Product Report'),
        actions: [
          IconButton(
            icon: Icon(Icons.save),
            color: Colors.white,
            onPressed: _saveForm,
          ),
        ],
      ),
      body: _isLoading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Form(
                key: _form,
                child: ListView(
                  children: <Widget>[
                    TextFormField(
                      initialValue: initValues['title'],
                      decoration: InputDecoration(labelText: 'Product Name'),
                      textInputAction: TextInputAction.next,
                      keyboardType: TextInputType.multiline,
                      onFieldSubmitted: (_) {
                        FocusScope.of(context)
                            .requestFocus(_productNameFocusNode);
                      },
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please provide a value';
                        }
                        return null;
                      },
                      onSaved: (value) {
                        _editedProductReport = ProductReportItem(
                          productName: value,
                          report: _editedProductReport.report,
                          maintenanceBy: _editedProductReport.maintenanceBy,
                          id: widget._productId,
                        );
                      },
                    ),
                    TextFormField(
                      initialValue: initValues['report'],
                      decoration: InputDecoration(labelText: 'Report'),
                      maxLines: 3,
                      textInputAction: TextInputAction.next,
                      keyboardType: TextInputType.multiline,
                      focusNode: _reportFocusNode,
                      onFieldSubmitted: (_) {
                        FocusScope.of(context).requestFocus(_manageByFocusNode);
                      },
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please provide a value';
                        }
                        return null;
                      },
                      onSaved: (value) {
                        _editedProductReport = ProductReportItem(
                          productName: _editedProductReport.productName,
                          report: value,
                          maintenanceBy: _editedProductReport.maintenanceBy,
                          id: widget._productId,
                        );
                      },
                    ),
                    TextFormField(
                      initialValue: initValues['maintenanceBy'],
                      decoration: InputDecoration(labelText: 'Maintenance By'),
                      keyboardType: TextInputType.multiline,
                      focusNode: _manageByFocusNode,
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please provide a value';
                        }
                        return null;
                      },
                      onSaved: (value) {
                        _editedProductReport = ProductReportItem(
                          productName: _editedProductReport.productName,
                          report: _editedProductReport.report,
                          maintenanceBy: value,
                          id: widget._productId,
                        );
                      },
                    ),
                  ],
                ),
              ),
            ),
    );
  }
}
