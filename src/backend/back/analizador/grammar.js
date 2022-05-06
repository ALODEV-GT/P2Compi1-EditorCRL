/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var grammar = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,10],$V1=[1,25],$V2=[1,27],$V3=[1,9],$V4=[1,36],$V5=[1,37],$V6=[1,38],$V7=[1,35],$V8=[1,34],$V9=[1,33],$Va=[1,32],$Vb=[1,31],$Vc=[1,29],$Vd=[1,30],$Ve=[1,28],$Vf=[1,39],$Vg=[1,40],$Vh=[1,41],$Vi=[1,42],$Vj=[1,43],$Vk=[1,44],$Vl=[13,15,35,38,40,41,42,43,45,52,54,55,56,62,63,64,65,66,67],$Vm=[1,52],$Vn=[6,13,15,35,38,40,41,42,43,45,52,54,55,56,62,63,64,65,66,67],$Vo=[13,14,15,18,35,38,40,41,42,43,45,52,54,55,56,62,63,64,65,66,67],$Vp=[1,55],$Vq=[1,72],$Vr=[1,73],$Vs=[1,81],$Vt=[1,79],$Vu=[1,76],$Vv=[1,80],$Vw=[1,75],$Vx=[1,77],$Vy=[1,78],$Vz=[1,82],$VA=[1,83],$VB=[1,84],$VC=[1,85],$VD=[1,98],$VE=[6,11,13,14,15,18,35,38,40,41,42,43,45,52,54,55,56,62,63,64,65,66,67],$VF=[1,108],$VG=[1,107],$VH=[1,109],$VI=[1,110],$VJ=[1,111],$VK=[1,112],$VL=[1,113],$VM=[1,114],$VN=[1,115],$VO=[1,116],$VP=[1,117],$VQ=[1,118],$VR=[1,119],$VS=[1,120],$VT=[1,121],$VU=[1,122],$VV=[11,37,48,57,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83],$VW=[1,144],$VX=[37,57],$VY=[11,37,48,57,68,69,70,71,72,74,75,76,77,78,79,80,81,82,83],$VZ=[11,37,48,57,81,82],$V_=[47,57],$V$=[11,37,48,57,68,69,74,75,76,77,78,79,80,81,82,83],$V01=[11,37,48,57,74,75,76,77,78,79,80,81,82,83],$V11=[11,37,48,57,78,79,80,81,82,83],$V21=[1,189],$V31=[1,190];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"S":3,"ENCABEZADO":4,"INSTRUCCIONES":5,"EOF":6,"IMPORTACIONES":7,"INCERTEZA":8,"IMPORTAR":9,"SALTOS":10,"salto_linea":11,"TABS":12,"tab":13,"importar":14,"id":15,"punto":16,"crl":17,"incerteza":18,"decimal":19,"INSTRUCCION":20,"DECLARACIONES":21,"ASIGNACION":22,"LLAMADA_FUNCION":23,"RETORNO":24,"INSTRUCCION_SI":25,"INSTRUCCION_SINO":26,"MOSTRAR":27,"PARA":28,"MIENTRAS":29,"DETENER":30,"CONTINUAR":31,"DIBUJAR_AST":32,"DIBUJAR_EXP":33,"DIBUJAR_TS":34,"dib_ast":35,"par_a":36,"par_c":37,"dib_exp":38,"EXP":39,"dib_ts":40,"continuar":41,"detener":42,"mientras":43,"dos_p":44,"para":45,"TIPO_VARIABLE_NATIVA":46,"asig":47,"pyc":48,"OP":49,"inc":50,"dec":51,"mostrar":52,"LISTA_EXPRESIONES":53,"si":54,"sino":55,"retorno":56,"coma":57,"IDS":58,"LISTA_PARAMETROS":59,"PARAMETRO":60,"TIPO_IGUAL":61,"double":62,"boolean":63,"string":64,"int":65,"char":66,"void":67,"menos":68,"mas":69,"por":70,"div":71,"mod":72,"pot":73,"mayor":74,"menor":75,"mayor_igual":76,"menor_igual":77,"igual":78,"dif":79,"sig_inc":80,"and":81,"or":82,"xor":83,"not":84,"entero":85,"true":86,"false":87,"cadena":88,"char_exp":89,"$accept":0,"$end":1},
terminals_: {2:"error",6:"EOF",11:"salto_linea",13:"tab",14:"importar",15:"id",16:"punto",17:"crl",18:"incerteza",19:"decimal",35:"dib_ast",36:"par_a",37:"par_c",38:"dib_exp",40:"dib_ts",41:"continuar",42:"detener",43:"mientras",44:"dos_p",45:"para",47:"asig",48:"pyc",50:"inc",51:"dec",52:"mostrar",54:"si",55:"sino",56:"retorno",57:"coma",62:"double",63:"boolean",64:"string",65:"int",66:"char",67:"void",68:"menos",69:"mas",70:"por",71:"div",72:"mod",73:"pot",74:"mayor",75:"menor",76:"mayor_igual",77:"menor_igual",78:"igual",79:"dif",80:"sig_inc",81:"and",82:"or",83:"xor",84:"not",85:"entero",86:"true",87:"false",88:"cadena",89:"char_exp"},
productions_: [0,[3,3],[3,2],[4,2],[4,1],[4,1],[7,2],[7,1],[10,2],[10,1],[12,2],[12,1],[9,5],[8,3],[5,3],[5,2],[5,2],[5,1],[20,2],[20,2],[20,2],[20,2],[20,2],[20,2],[20,2],[20,2],[20,2],[20,2],[20,2],[20,2],[20,2],[20,2],[32,4],[33,4],[34,3],[31,1],[30,1],[29,5],[28,12],[28,9],[49,1],[49,1],[27,4],[25,5],[26,2],[24,2],[24,1],[21,2],[21,6],[21,4],[21,5],[21,6],[59,3],[59,1],[60,2],[22,3],[61,1],[58,3],[58,1],[46,1],[46,1],[46,1],[46,1],[46,1],[46,1],[39,2],[39,3],[39,3],[39,3],[39,3],[39,3],[39,3],[39,3],[39,3],[39,3],[39,3],[39,3],[39,3],[39,3],[39,3],[39,3],[39,3],[39,3],[39,2],[39,1],[39,1],[39,1],[39,1],[39,1],[39,1],[39,1],[39,1],[39,1],[23,3],[23,4],[53,3],[53,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
}
},
table: [{3:1,4:2,5:3,7:4,8:5,9:8,12:6,13:$V0,14:$V1,15:$V2,18:$V3,20:7,21:11,22:12,23:13,24:14,25:15,26:16,27:17,28:18,29:19,30:20,31:21,32:22,33:23,34:24,35:$V4,38:$V5,40:$V6,41:$V7,42:$V8,43:$V9,45:$Va,46:26,52:$Vb,54:$Vc,55:$Vd,56:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj,67:$Vk},{1:[3]},{5:45,12:6,13:$V0,15:$V2,20:7,21:11,22:12,23:13,24:14,25:15,26:16,27:17,28:18,29:19,30:20,31:21,32:22,33:23,34:24,35:$V4,38:$V5,40:$V6,41:$V7,42:$V8,43:$V9,45:$Va,46:26,52:$Vb,54:$Vc,55:$Vd,56:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj,67:$Vk},{6:[1,46],12:47,13:$V0,15:$V2,20:48,21:11,22:12,23:13,24:14,25:15,26:16,27:17,28:18,29:19,30:20,31:21,32:22,33:23,34:24,35:$V4,38:$V5,40:$V6,41:$V7,42:$V8,43:$V9,45:$Va,46:26,52:$Vb,54:$Vc,55:$Vd,56:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj,67:$Vk},o($Vl,[2,4],{8:49,9:50,14:$V1,18:$V3}),o($Vl,[2,5]),{13:$Vm,15:$V2,20:51,21:11,22:12,23:13,24:14,25:15,26:16,27:17,28:18,29:19,30:20,31:21,32:22,33:23,34:24,35:$V4,38:$V5,40:$V6,41:$V7,42:$V8,43:$V9,45:$Va,46:26,52:$Vb,54:$Vc,55:$Vd,56:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj,67:$Vk},o($Vn,[2,17]),o($Vo,[2,7]),{19:[1,53]},o($Vl,[2,11]),{10:54,11:$Vp},{10:56,11:$Vp},{10:57,11:$Vp},{10:58,11:$Vp},{10:59,11:$Vp},{10:60,11:$Vp},{10:61,11:$Vp},{10:62,11:$Vp},{10:63,11:$Vp},{10:64,11:$Vp},{10:65,11:$Vp},{10:66,11:$Vp},{10:67,11:$Vp},{10:68,11:$Vp},{15:[1,69]},{15:[1,70]},{36:$Vq,47:$Vr,61:71},{11:[2,46],15:$Vs,19:$Vt,23:86,36:$Vu,39:74,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{36:[1,87]},{44:[1,88]},{36:[1,89]},{36:[1,90]},{36:[1,91]},{11:[2,36]},{11:[2,35]},{36:[1,92]},{36:[1,93]},{36:[1,94]},{15:[2,59]},{15:[2,60]},{15:[2,61]},{15:[2,62]},{15:[2,63]},{15:[2,64]},{6:[1,95],12:47,13:$V0,15:$V2,20:48,21:11,22:12,23:13,24:14,25:15,26:16,27:17,28:18,29:19,30:20,31:21,32:22,33:23,34:24,35:$V4,38:$V5,40:$V6,41:$V7,42:$V8,43:$V9,45:$Va,46:26,52:$Vb,54:$Vc,55:$Vd,56:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj,67:$Vk},{1:[2,2]},{13:$Vm,15:$V2,20:96,21:11,22:12,23:13,24:14,25:15,26:16,27:17,28:18,29:19,30:20,31:21,32:22,33:23,34:24,35:$V4,38:$V5,40:$V6,41:$V7,42:$V8,43:$V9,45:$Va,46:26,52:$Vb,54:$Vc,55:$Vd,56:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj,67:$Vk},o($Vn,[2,16]),o($Vl,[2,3]),o($Vo,[2,6]),o($Vn,[2,15]),o($Vl,[2,10]),{10:97,11:$Vp},o($Vn,[2,18],{11:$VD}),o($VE,[2,9]),o($Vn,[2,19],{11:$VD}),o($Vn,[2,20],{11:$VD}),o($Vn,[2,21],{11:$VD}),o($Vn,[2,22],{11:$VD}),o($Vn,[2,23],{11:$VD}),o($Vn,[2,24],{11:$VD}),o($Vn,[2,25],{11:$VD}),o($Vn,[2,26],{11:$VD}),o($Vn,[2,27],{11:$VD}),o($Vn,[2,28],{11:$VD}),o($Vn,[2,29],{11:$VD}),o($Vn,[2,30],{11:$VD}),o($Vn,[2,31],{11:$VD}),{16:[1,99]},{11:[2,47],36:[1,102],47:[1,101],57:[1,100]},{15:$Vs,19:$Vt,23:86,36:$Vu,39:103,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,37:[1,104],39:106,53:105,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},o([15,19,36,64,68,84,85,86,87,88,89],[2,56]),{11:[2,45],68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR,81:$VS,82:$VT,83:$VU},{15:$Vs,19:$Vt,23:86,36:$Vu,39:123,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:124,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:125,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},o($VV,[2,84]),o($VV,[2,85]),o($VV,[2,86]),o($VV,[2,87],{36:$Vq}),o($VV,[2,88]),o($VV,[2,89]),o($VV,[2,90]),o($VV,[2,91]),o($VV,[2,92]),{15:$Vs,19:$Vt,23:86,36:$Vu,39:126,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{11:[2,44]},{15:$Vs,19:$Vt,23:86,36:$Vu,39:106,53:127,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:[1,130],22:129,46:128,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj,67:$Vk},{15:$Vs,19:$Vt,23:86,36:$Vu,39:131,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:[1,132]},{15:$Vs,19:$Vt,23:86,36:$Vu,39:133,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{37:[1,134]},{1:[2,1]},o($Vn,[2,14]),o($Vl,[2,13],{11:$VD}),o($VE,[2,8]),{17:[1,135]},{15:[1,137],58:136},{15:$Vs,19:$Vt,23:86,36:$Vu,39:138,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{37:[1,139],46:142,59:140,60:141,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj,67:$Vk},o([11,48],[2,55],{68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR,81:$VS,82:$VT,83:$VU}),o($VV,[2,93]),{37:[1,143],57:$VW},o($VX,[2,96],{68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR,81:$VS,82:$VT,83:$VU}),{15:$Vs,19:$Vt,23:86,36:$Vu,39:145,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:146,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:147,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:148,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:149,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:150,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:151,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:152,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:153,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:154,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:155,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:156,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:157,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:158,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:159,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:$Vs,19:$Vt,23:86,36:$Vu,39:160,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},o($VY,[2,65],{73:$VK}),{37:[1,161],68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR,81:$VS,82:$VT,83:$VU},o($VZ,[2,83],{68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR,83:$VU}),{37:[1,162],68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR,81:$VS,82:$VT,83:$VU},{37:[1,163],57:$VW},{15:[1,164]},{48:[1,165]},{47:$Vr,61:71},{37:[1,166],68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR,81:$VS,82:$VT,83:$VU},{37:[1,167]},{37:[1,168],68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR,81:$VS,82:$VT,83:$VU},{11:[2,34]},{10:169,11:$Vp},{47:[1,170],57:[1,171]},o($V_,[2,58]),{11:[2,49],68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR,81:$VS,82:$VT,83:$VU},{44:[1,172]},{37:[1,173],57:[1,174]},o($VX,[2,53]),{15:[1,175]},o($VV,[2,94]),{15:$Vs,19:$Vt,23:86,36:$Vu,39:176,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},o($V$,[2,66],{70:$VH,71:$VI,72:$VJ,73:$VK}),o($V$,[2,67],{70:$VH,71:$VI,72:$VJ,73:$VK}),o($VY,[2,68],{73:$VK}),o($VY,[2,69],{73:$VK}),o($VY,[2,70],{73:$VK}),o($VY,[2,71],{73:$VK}),o($V01,[2,73],{68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK}),o($V01,[2,74],{68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK}),o($V01,[2,75],{68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK}),o($V01,[2,76],{68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK}),o($V11,[2,77],{68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO}),o($V11,[2,78],{68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO}),o($V11,[2,79],{68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO}),o($VZ,[2,80],{68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR,83:$VU}),o([11,37,48,57,82],[2,81],{68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR,81:$VS,83:$VU}),o([11,37,48,57,81,82,83],[2,82],{68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR}),o($VV,[2,72]),{44:[1,177]},{11:[2,42]},{47:[1,178]},{15:$Vs,19:$Vt,23:86,36:$Vu,39:179,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{44:[1,180]},{11:[2,32]},{11:[2,33]},o($Vo,[2,12],{11:$VD}),{15:$Vs,19:$Vt,23:86,36:$Vu,39:181,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{15:[1,182]},{11:[2,50]},{44:[1,183]},{46:142,60:184,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj,67:$Vk},o($VX,[2,54]),o($VX,[2,95],{68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR,81:$VS,82:$VT,83:$VU}),{11:[2,43]},{15:$Vs,19:$Vt,23:86,36:$Vu,39:185,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{48:[1,186],68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR,81:$VS,82:$VT,83:$VU},{11:[2,37]},{11:[2,48],68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR,81:$VS,82:$VT,83:$VU},o($V_,[2,57]),{11:[2,51]},o($VX,[2,52]),{48:[1,187],68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR,81:$VS,82:$VT,83:$VU},{49:188,50:$V21,51:$V31},{15:$Vs,19:$Vt,23:86,36:$Vu,39:191,64:$Vv,68:$Vw,84:$Vx,85:$Vy,86:$Vz,87:$VA,88:$VB,89:$VC},{37:[1,192]},{37:[2,40]},{37:[2,41]},{48:[1,193],68:$VF,69:$VG,70:$VH,71:$VI,72:$VJ,73:$VK,74:$VL,75:$VM,76:$VN,77:$VO,78:$VP,79:$VQ,80:$VR,81:$VS,82:$VT,83:$VU},{44:[1,194]},{49:195,50:$V21,51:$V31},{11:[2,39]},{37:[1,196]},{44:[1,197]},{11:[2,38]}],
defaultActions: {34:[2,36],35:[2,35],39:[2,59],40:[2,60],41:[2,61],42:[2,62],43:[2,63],44:[2,64],46:[2,2],88:[2,44],95:[2,1],134:[2,34],163:[2,42],167:[2,32],168:[2,33],172:[2,50],177:[2,43],180:[2,37],183:[2,51],189:[2,40],190:[2,41],194:[2,39],197:[2,38]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

	
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-sensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 11
break;
case 1:return 13
break;
case 2:
break;
case 3:
break;
case 4:
break;
case 5:return 18
break;
case 6:return 14	
break;
case 7:return 62
break;
case 8:return 63
break;
case 9:return 64
break;
case 10:return 65
break;
case 11:return 66
break;
case 12:return 67
break;
case 13:return 86
break;
case 14:return 87
break;
case 15:return 56
break;
case 16:return 54
break;
case 17:return 55
break;
case 18:return 45
break;
case 19:return 43
break;
case 20:return 42
break;
case 21:return 41
break;
case 22:return 52
break;
case 23:return 35
break;
case 24:return 38
break;
case 25:return 40
break;
case 26:return 17
break;
case 27:return 50
break;
case 28:return 69
break;
case 29:return 51	
break;
case 30:return 68
break;
case 31:return 70
break;
case 32:return 71
break;
case 33:return 72
break;
case 34:return 73
break;
case 35:return 77
break;
case 36:return 76
break;
case 37:return 75
break;
case 38:return 74
break;
case 39:return 78
break;
case 40:return 47
break;
case 41:return 79
break;
case 42:return 84
break;
case 43:return 80
break;
case 44:return 81
break;
case 45:return 82
break;
case 46:return 83
break;
case 47:return 36
break;
case 48:return 37
break;
case 49:return 44
break;
case 50:return 57
break;
case 51:return 48
break;
case 52:return 16
break;
case 53: yy_.yytext = yy_.yytext.substr(0,yy_.yyleng-0); return 88; 
break;
case 54:return 89
break;
case 55:return 15
break;
case 56:return 19
break;
case 57:return 85
break;
case 58:return 6
break;
case 59: console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column); 
break;
}
},
rules: [/^(?:\n)/,/^(?:\t)/,/^(?:\s+)/,/^(?:!!.*)/,/^(?:[‘][’][^’]*[’]+([^‘][^‘]*[‘]+)*[’][’])/,/^(?:Incerteza\b)/,/^(?:Importar\b)/,/^(?:Double\b)/,/^(?:Boolean\b)/,/^(?:String\b)/,/^(?:Int\b)/,/^(?:Char\b)/,/^(?:Void\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:Retorno\b)/,/^(?:Si\b)/,/^(?:Sino\b)/,/^(?:Para\b)/,/^(?:Mientras\b)/,/^(?:Detener\b)/,/^(?:Continuar\b)/,/^(?:Mostrar\b)/,/^(?:DibujarAST\b)/,/^(?:DibujarEXP\b)/,/^(?:DibujarTS\b)/,/^(?:crl\b)/,/^(?:\+\+)/,/^(?:\+)/,/^(?:--)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:\^)/,/^(?:<=)/,/^(?:>=)/,/^(?:<)/,/^(?:>)/,/^(?:==)/,/^(?:=)/,/^(?:!=)/,/^(?:!)/,/^(?:~)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:\|&)/,/^(?:\()/,/^(?:\))/,/^(?::)/,/^(?:,)/,/^(?:;)/,/^(?:\.)/,/^(?:"[^\"]*")/,/^(?:'[^]')/,/^(?:(()?[a-zA-Z]+(|[a-zA-Z0-9]+)*))/,/^(?:[0-9]+(\.[0-9]+)\b)/,/^(?:[0-9]+\b)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = grammar;
exports.Parser = grammar.Parser;
exports.parse = function () { return grammar.parse.apply(grammar, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}