import { SchemaDataType } from "./index.ts";

export interface StringSchemaType<T = never> {
  uniqId: string;
  type: SchemaDataType.string;
  value: string | undefined;
  required?: boolean | undefined;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  pattern?: RegExp | undefined;
  format?: ((value: string | undefined) => T) | undefined;
  // format:
  //   | "date-time" //日期和时间在一起，例如， 2018-11-13T20:20:39+00:00
  //   | "time" //draft7的时间，例如，20:20:39+00:00
  //   | "date" //draft7的日期，例如，2018-11-13
  //   | "email" //Internet 电子邮件地址，请参阅RFC 5322，第 3.4.1 节。
  //   | "idn-email" //draft7的新内容Internet 电子邮件地址的国际化形式，请参阅 RFC 6531
  //   | "hostname" //Internet 主机名，请参阅RFC 1034，第 3.1 节。
  //   | "idn-hostname" //draft7的 中的新内容，国际化 Internet 主机名，请参阅 RFC5890，第 2.3.2.3 节。
  //   | "ipv4" //IPv4 地址，根据RFC 2673 第 3.2 节中定义的点分四线 ABNF 语法
  //   | "ipv6" //IPv6 地址，如RFC 2373 第 2.2 节中所定义
  //   | "uri" //根据RFC3986 的通用资源标识符 (URI)
  //   | "uri-reference" //draft7 6 中的新增内容，一个 URI 引用（URI 或相对引用），根据RFC3986 第 4.1 节
  //   | "iri" //draft 7 中的新内容，根据RFC3987，“uri”的国际化等价物。
  //   | "iri-reference" //draft7中的新内容，根据RFC3987，“uri-reference”的国际化等价物
  //   | "uri-template" //draft 6 中的新增内容，一个 URI 模板（任何级别）根据 RFC6570。如果您还不知道 URI 模板是什么，您可能不需要这个值。
  //   | "regex"; //draft7中的新内容，正则表达式，根据ECMA 262 应有效
}
