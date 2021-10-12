# Chapter 11 Data Types

MySQL supports SQL data types in several categories: numeric types, date and time types, string (character and byte) types, spatial types, and the [`JSON`](json.md) data type. This chapter provides an overview and more detailed description of the properties of the types in each category, and a summary of the data type storage requirements. The initial overviews are intentionally brief. Consult the more detailed descriptions for additional information about particular data types, such as the permissible formats in which you can specify values.

Data type descriptions use these conventions:

- For integer types, *`M`* indicates the maximum display width. For floating-point and fixed-point types, *`M`* is the total number of digits that can be stored (the precision). For string types, *`M`* is the maximum length. The maximum permissible value of *`M`* depends on the data type.

- *`D`* applies to floating-point and fixed-point types and indicates the number of digits following the decimal point (the scale). The maximum possible value is 30, but should be no greater than *`M`* −2.

- *`fsp`* applies to the [TIME](time.md), [DATETIME](datetime.md), and [TIMESTAMP](datetime.md) types and represents fractional seconds precision; that is, the number of digits following the decimal point for fractional parts of seconds. The *`fsp`* value, if given, must be in the range 0 to 6. A value of 0 signifies that there is no fractional part. If omitted, the default precision is 0. (This differs from the standard SQL default of 6, for compatibility with previous MySQL versions.)

- Square brackets (`[` and `]`) indicate optional parts of type definitions.

