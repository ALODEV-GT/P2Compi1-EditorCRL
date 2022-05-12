/*-----------------------IMPORTACIONES--------------------*/
%{
	let contadorTabs = 0;
%}

/*-------------------------LEXICO-------------------------*/
%lex

%options case-sensitive

%%

\n				  		return 'salto_linea'
\t						return 'tab'
\s+							{}

//Comentarios
"!!".*  					{}     //de linea
[‘][’][^’]*[’]+([^‘][^‘]*[‘]+)*[’][’]	{}


//‘’’
//‘’’

//Palabras reservadas
'Incerteza'				return 'incerteza'
'Importar'				return 'importar'	
'Double'				return 'double'
'Boolean'				return 'boolean'
'String'				return 'string'
'Int'					return 'int'
'Char'					return 'char'
'Void'					return 'void'
'true'					return 'true'
'false'					return 'false'
'Retorno'				return 'retorno'
'Si'					return 'si'
'Sino'					return 'sino'
'Para'					return 'para'
'Mientras'				return 'mientras'
'Detener'				return 'detener'
'Continuar'				return 'continuar'
'Mostrar'				return 'mostrar'
'DibujarAST'			return 'dib_ast'
'DibujarEXP'			return 'dib_exp'
'DibujarTS'				return 'dib_ts'
'Principal'				return 'principal'
'crl'					return 'crl'

//Signos
'++'					return 'inc'
'+' 					return 'mas'
'--'					return 'dec'	
'-'						return 'menos'
'*'						return 'por'
'/'						return 'div'
'%'						return 'mod'
'^'						return 'pot'
'<='					return 'menor_igual'
'>='					return 'mayor_igual'
'<'						return 'menor'
'>'						return 'mayor'
'=='					return 'igual'
'='						return 'asig'
'!='					return 'dif'
'!'						return 'not'
'~'						return 'sig_inc'
'&&'					return 'and'
'||'					return 'or'
'|&'					return 'xor'
'('						return 'par_a'
')'						return 'par_c'
':'						return 'dos_p'
','						return 'coma'
';'						return 'pyc'
'.'						return 'punto'

//Valores
\"[^\"]*\"				{ yytext = yytext.substr(0,yyleng-0); return 'cadena'; }
"'"[^]"'"  				return 'char_exp'
(()?[a-zA-Z]+(|[a-zA-Z0-9]+)*) return 'id'
[0-9]+("."[0-9]+)\b     return 'decimal'
[0-9]+\b                return 'entero'

<<EOF>>                 return 'EOF'

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

/*-------------------------SINTACTICO-------------------------*/

// Asociación y precedencia
%left 'or'
%left 'and'
%left 'not'
%left 'xor'
%left 'igual' 'dif' 'sig_inc'
%left 'mayor' 'menor' 'mayor_igual' 'menor_igual'
%left 'mas' 'menos'
%left 'por' 'div' 'mod'
%left 'umenos'
%right 'pot'
%left 'inc' 'dec'

%start S


%% 

//Definición de la gramática
S
	: ENCABEZADO INSTRUCCIONES EOF 	{Parser.yy.Agrup.ordenar(Parser.yy.LisIn.raiz); var r = Parser.yy.Agrup.agruparArbol(Parser.yy.LisIn.raiz, yylineno); return r; }
	| INSTRUCCIONES EOF				{Parser.yy.Agrup.ordenar(Parser.yy.LisIn.raiz); var r = Parser.yy.Agrup.agruparArbol(Parser.yy.LisIn.raiz, yylineno); return r; }
;

ENCABEZADO
	: IMPORTACIONES INCERTEZA
	| SALTOS IMPORTACIONES INCERTEZA
	| IMPORTACIONES
	| SALTOS IMPORTACIONES
	| INCERTEZA
	| SALTOS INCERTEZA
;

IMPORTACIONES
	: IMPORTACIONES IMPORTAR
	| IMPORTAR
;

SALTOS
	: SALTOS salto_linea
	| salto_linea
;

TABS 
	: TABS tab {contadorTabs++;}
	| tab 	   {contadorTabs++;}
;

IMPORTAR
	: importar id punto crl SALTOS
;

INCERTEZA 
	: incerteza decimal SALTOS
;

INSTRUCCIONES
	: INSTRUCCIONES TABS INSTRUCCION 
	| TABS INSTRUCCION
	| INSTRUCCIONES INSTRUCCION
	| INSTRUCCION 
;

INSTRUCCION
	: DECLARACIONES SALTOS   		{$$ = new Parser.yy.Nodo("INSTRUCCION","", yylineno); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| ASIGNACION SALTOS				{$$ = new Parser.yy.Nodo("INSTRUCCION","", yylineno); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| LLAMADA_FUNCION SALTOS		{$$ = new Parser.yy.Nodo("INSTRUCCION","", yylineno); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| RETORNO SALTOS				{$$ = new Parser.yy.Nodo("INSTRUCCION","", yylineno); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| INSTRUCCION_SI SALTOS			{$$ = new Parser.yy.Nodo("INSTRUCCION","", yylineno); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| INSTRUCCION_SINO SALTOS		{$$ = new Parser.yy.Nodo("INSTRUCCION","", yylineno); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| MOSTRAR SALTOS				{$$ = new Parser.yy.Nodo("INSTRUCCION","", yylineno); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| PARA SALTOS					{$$ = new Parser.yy.Nodo("INSTRUCCION","", yylineno); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| MIENTRAS SALTOS				{$$ = new Parser.yy.Nodo("INSTRUCCION","", yylineno); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| DETENER SALTOS				{$$ = new Parser.yy.Nodo("INSTRUCCION","", yylineno); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| CONTINUAR SALTOS				{$$ = new Parser.yy.Nodo("INSTRUCCION","", yylineno); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| FUNCION_PRINCIPAL SALTOS		{$$ = new Parser.yy.Nodo("INSTRUCCION","", yylineno); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| DIBUJAR_AST SALTOS			{$$ = new Parser.yy.Nodo("INSTRUCCION","", yylineno); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| DIBUJAR_EXP SALTOS			{$$ = new Parser.yy.Nodo("INSTRUCCION","", yylineno); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| DIBUJAR_TS SALTOS				{$$ = new Parser.yy.Nodo("INSTRUCCION","", yylineno); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
;

FUNCION_PRINCIPAL
	: void principal par_a par_c dos_p {$$ = new Parser.yy.Nodo("FUNCION_PRINCIPAL","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"void",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($2,"principal",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($3,"par_a",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($4,"par_c",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($5,"dos_p", yylineno));}
;

DIBUJAR_AST
	: dib_ast par_a id par_c	{$$ = new Parser.yy.Nodo("DIBUJAR_AST","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"dib_ast",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($3,"id",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($4,"par_c", yylineno));}
;

DIBUJAR_EXP
	: dib_exp par_a EXP par_c	{$$ = new Parser.yy.Nodo("DIBUJAR_EXP","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"dib_exp",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a",yylineno)); $$.agregarHijo($3); $$.agregarHijo(new Parser.yy.Nodo($4,"par_c",yylineno));}
;

DIBUJAR_TS
	: dib_ts par_a par_c		{$$ = new Parser.yy.Nodo("DIBUJAR_TS","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"dib_ts",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($3,"par_c",yylineno));}
;

CONTINUAR
	: continuar 	{$$ = new Parser.yy.Nodo("CONTINUAR","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"continuar",yylineno));}
;

DETENER
	: detener 		{$$ = new Parser.yy.Nodo("DETENER","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"detener",yylineno));}
;

MIENTRAS
	: mientras par_a EXP par_c dos_p		{$$ = new Parser.yy.Nodo("MIENTRAS","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"mientras",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a",yylineno)); $$.agregarHijo($3); $$.agregarHijo(new Parser.yy.Nodo($4,"par_c",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($5,"dos_p",yylineno));}
;

PARA 
	: para par_a TIPO_VARIABLE_NATIVA id asig EXP pyc EXP pyc OP par_c dos_p  	{$$ = new Parser.yy.Nodo("PARA","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"para",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a",yylineno)); $$.agregarHijo($3); $$.agregarHijo(new Parser.yy.Nodo($4,"id",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($5,"asig",yylineno)); $$.agregarHijo($6); $$.agregarHijo(new Parser.yy.Nodo($7,"pyc",yylineno)); $$.agregarHijo($8); $$.agregarHijo(new Parser.yy.Nodo($9,"pyc",yylineno)); $$.agregarHijo($10); $$.agregarHijo(new Parser.yy.Nodo($11,"par_c",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($12,"dos_p",yylineno));}
	| para par_a ASIGNACION pyc EXP pyc OP par_c dos_p							{$$ = new Parser.yy.Nodo("PARA","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"para",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a",yylineno)); $$.agregarHijo($3); $$.agregarHijo(new Parser.yy.Nodo($4,"pyc",yylineno)); $$.agregarHijo($5); $$.agregarHijo(new Parser.yy.Nodo($6,"pyc",yylineno)); $$.agregarHijo($7); $$.agregarHijo(new Parser.yy.Nodo($8,"par_c",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($9,"dos_p",yylineno));}
;

OP
	: inc  			{$$ = new Parser.yy.Nodo("OP","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"inc",yylineno));}
	| dec 			{$$ = new Parser.yy.Nodo("OP","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"dec",yylineno));}
;

MOSTRAR 
	: mostrar par_a LISTA_EXPRESIONES par_c {$$ = new Parser.yy.Nodo("MOSTRAR","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"mostrar",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a",yylineno)); $$.agregarHijo($3); $$.agregarHijo(new Parser.yy.Nodo($4,"par_c",yylineno));}
;

INSTRUCCION_SI
	: si par_a EXP par_c dos_p		{$$ = new Parser.yy.Nodo("INSTRUCCION_SI","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"si",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a",yylineno)); $$.agregarHijo($3); $$.agregarHijo(new Parser.yy.Nodo($4,"par_c",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($5,"dos_p",yylineno));}		
;

INSTRUCCION_SINO
	: sino dos_p	{$$ = new Parser.yy.Nodo("INSTRUCCION_SINO","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"sino",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($2,"dos_p",yylineno));}
;

RETORNO
	: retorno EXP  	{$$ = new Parser.yy.Nodo("RETORNO","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"retorno",yylineno)); $$.agregarHijo($2);}
	| retorno 		{$$ = new Parser.yy.Nodo("RETORNO","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"retorno",yylineno));}
;

DECLARACIONES
	: TIPO_VARIABLE_NATIVA id										{$$ = new Parser.yy.Nodo("DECLARACION_VAR","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"id",yylineno)); }
	| TIPO_VARIABLE_NATIVA id coma IDS asig EXP						{$$ = new Parser.yy.Nodo("DECLARACION_VAR","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"id",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($3,"coma",yylineno));  $$.agregarHijo($4); $$.agregarHijo(new Parser.yy.Nodo($5,"asig",yylineno)); $$.agregarHijo($6);}	
	| TIPO_VARIABLE_NATIVA id asig EXP								{$$ = new Parser.yy.Nodo("DECLARACION_VAR","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"id",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($3,"asig",yylineno));  $$.agregarHijo($4);}
	| TIPO_VARIABLE_NATIVA id par_a par_c dos_p						{$$ = new Parser.yy.Nodo("DECLARACION_FUN","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"id",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($3,"par_a",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($4,"par_c",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($5,"dos_p",yylineno));}
	| TIPO_VARIABLE_NATIVA id par_a LISTA_PARAMETROS par_c dos_p	{$$ = new Parser.yy.Nodo("DECLARACION_FUN","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"id",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($3,"par_a",yylineno)); $$.agregarHijo($4); $$.agregarHijo(new Parser.yy.Nodo($5,"par_c",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($6,"dos_p",yylineno));}
;


LISTA_PARAMETROS
  	: LISTA_PARAMETROS coma PARAMETRO 	{$$ = new Parser.yy.Nodo("LISTA_PARAMETROS","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"coma",yylineno)); $$.agregarHijo($3);}
  	| PARAMETRO 						{$$ = new Parser.yy.Nodo("LISTA_PARAMETROS","",yylineno); $$.agregarHijo($1);}
;

PARAMETRO
  	: TIPO_VARIABLE_NATIVA id 	{$$ = new Parser.yy.Nodo("PARAMETRO","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"id",yylineno));}  
;

ASIGNACION
	: id TIPO_IGUAL EXP  		{$$ = new Parser.yy.Nodo("ASIGNACION","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"id",yylineno)); $$.agregarHijo($2); $$.agregarHijo($3);}
; 

TIPO_IGUAL
	: asig 						{$$ = new Parser.yy.Nodo("TIPO_IGUAL","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"asig",yylineno));}
;

IDS
	: IDS coma id				{$$ = new Parser.yy.Nodo("IDS","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"coma",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($3,"id",yylineno));}
	| id 						{$$ = new Parser.yy.Nodo("IDS","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"id",yylineno));}
;

TIPO_VARIABLE_NATIVA
	: double  					{$$ = new Parser.yy.Nodo("TIPO_VARIABLE_NATIVA","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"double",yylineno));}
	| boolean 					{$$ = new Parser.yy.Nodo("TIPO_VARIABLE_NATIVA","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"boolean",yylineno));}
	| string 					{$$ = new Parser.yy.Nodo("TIPO_VARIABLE_NATIVA","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"string",yylineno));}
	| int 						{$$ = new Parser.yy.Nodo("TIPO_VARIABLE_NATIVA","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"int",yylineno));}
	| char 						{$$ = new Parser.yy.Nodo("TIPO_VARIABLE_NATIVA","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"char",yylineno));}
	| void 						{$$ = new Parser.yy.Nodo("TIPO_VARIABLE_NATIVA","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"void",yylineno));}
;

EXP
  //Operaciones Aritmeticas
  : menos EXP %prec umenos  	{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo(new Parser.yy.Nodo("-","negativo",yylineno)); $$.agregarHijo($2);}
  | EXP mas EXP  				{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("+","suma",yylineno)); $$.agregarHijo($3);}
  | EXP menos EXP 				{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("-","resta",yylineno)); $$.agregarHijo($3);}
  | EXP por EXP					{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("*","producto",yylineno)); $$.agregarHijo($3);} 
  | EXP div EXP					{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("/","division",yylineno)); $$.agregarHijo($3);} 
  | EXP mod EXP					{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("%","mod",yylineno)); $$.agregarHijo($3);} 
  | EXP pot EXP					{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("^","potencia",yylineno)); $$.agregarHijo($3);} 
  | par_a EXP par_c 			{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($2);}
  //Operaciones de Comparacion
  | EXP mayor EXP  				{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo(">","mayor",yylineno)); $$.agregarHijo($3);}
  | EXP menor EXP 				{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("<","menor",yylineno)); $$.agregarHijo($3);}
  | EXP mayor_igual EXP 		{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo(">=","mayor_igual",yylineno)); $$.agregarHijo($3);}
  | EXP menor_igual EXP 		{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("<=","menor_igual",yylineno)); $$.agregarHijo($3);}
  | EXP igual EXP 				{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("==","igual",yylineno)); $$.agregarHijo($3);}
  | EXP dif EXP					{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("!=","dif",yylineno)); $$.agregarHijo($3);}
  | EXP sig_inc EXP 			{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("~","sig_inc",yylineno)); $$.agregarHijo($3);}
  //Operaciones Lógicas
  | EXP and EXP 				{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("&&","and",yylineno)); $$.agregarHijo($3);}					
  | EXP or EXP					{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("||","or",yylineno)); $$.agregarHijo($3);}
  | EXP xor EXP 				{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("|&","xor",yylineno)); $$.agregarHijo($3);}	
  | not EXP 					{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo(new Parser.yy.Nodo("!","not")); $$.agregarHijo($2);}
  //Valores Primitivos
  | entero						{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"ENTERO",yylineno));}
  | decimal						{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"DECIMAL",yylineno));}
  | id							{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"ID",yylineno));}
  | true						{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"BOOLEAN",yylineno));}
  | false						{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"BOOLEAN",yylineno));}
  | cadena						{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"CADENA",yylineno));}	
  | char_exp 					{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"CHAR",yylineno));}
  //Funciones
  | LLAMADA_FUNCION 			{$$ = new Parser.yy.Nodo("EXP","",yylineno); $$.agregarHijo($1);}
;

LLAMADA_FUNCION
	: id par_a par_c 					{$$ = new Parser.yy.Nodo("LLAMADA_FUNCION","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"id",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($3,"par_c",yylineno));}
	| id par_a LISTA_EXPRESIONES par_c 	{$$ = new Parser.yy.Nodo("LLAMADA_FUNCION","",yylineno); $$.agregarHijo(new Parser.yy.Nodo($1,"id",yylineno)); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a",yylineno)); $$.agregarHijo($3); $$.agregarHijo(new Parser.yy.Nodo($4,"par_c",yylineno));}
;

LISTA_EXPRESIONES
	: LISTA_EXPRESIONES coma EXP 		{$$ = new Parser.yy.Nodo("LISTA_EXPRESIONES","",yylineno); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"coma",yylineno)); $$.agregarHijo($3);}
	| EXP 								{$$ = new Parser.yy.Nodo("LISTA_EXPRESIONES","",yylineno); $$.agregarHijo($1);}
;