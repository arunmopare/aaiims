//TODO: change the isVendorActive: from boolean to string
export interface Vendors {
  _id: any ,
  vendor_name: string,
  vendor_email_address: string,
  vendor_shop_name: string,
  vendor_mobile_number: number,
  vendor_shop_address: string,
  isVendorActive:boolean,
  vendorDeactivateRequest: boolean,
}

