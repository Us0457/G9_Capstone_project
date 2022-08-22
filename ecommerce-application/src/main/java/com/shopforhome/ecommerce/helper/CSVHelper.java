package com.shopforhome.ecommerce.helper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;

import com.shopforhome.ecommerce.model.Product;
public class CSVHelper {
  public static String TYPE = "text/csv";
  static String[] HEADERs = { "Id", "Name", "ImageURL", "Price", "Description", "CategoryId"};
  public static boolean hasCSVFormat(MultipartFile file) {
    if (!TYPE.equals(file.getContentType())) {
      return false;
    }
    return true;
  }
  public static List<Product> csvToProducts(InputStream is) {
    try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
        CSVParser csvParser = new CSVParser(fileReader,
            CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {
      List<Product> products = new ArrayList<Product>();
      Iterable<CSVRecord> csvRecords = csvParser.getRecords();
      for (CSVRecord csvRecord : csvRecords) {
    	 
//    	  Product product = new Product(
//    			  Integer.parseInt(csvRecord.get("Id")),
//    			  csvRecord.get("Name"),
//    			  csvRecord.get("ImageURL"),
//    			  csvRecord.get("Price"), null),
//    			  csvRecord.get("Description")
//    			  );
//    	  products.add(product);
//        Tutorial tutorial = new Tutorial(
//              Long.parseLong(csvRecord.get("Id")),
//              csvRecord.get("Title"),
//              csvRecord.get("Description"),
//              Boolean.parseBoolean(csvRecord.get("Published"))
//            );
//        tutorials.add(tutorial);
      }
      return products;
    } catch (IOException e) {
      throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
    }
  }
}
