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
	: ENCABEZADO INSTRUCCIONES EOF 	{Parser.yy.Agrup.ordenar(Parser.yy.LisIn.raiz); var r = Parser.yy.Agrup.agruparArbol(Parser.yy.LisIn.raiz); return r; }
	| INSTRUCCIONES EOF				{Parser.yy.Agrup.ordenar(Parser.yy.LisIn.raiz); var r = Parser.yy.Agrup.agruparArbol(Parser.yy.LisIn.raiz); return r; }
;

ENCABEZADO
	: IMPORTACIONES INCERTEZA
	| IMPORTACIONES
	| INCERTEZA
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
	: DECLARACIONES SALTOS   		{$$ = new Parser.yy.Nodo("INSTRUCCION",""); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| ASIGNACION SALTOS				{$$ = new Parser.yy.Nodo("INSTRUCCION",""); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| LLAMADA_FUNCION SALTOS		{$$ = new Parser.yy.Nodo("INSTRUCCION",""); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| RETORNO SALTOS				{$$ = new Parser.yy.Nodo("INSTRUCCION",""); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| INSTRUCCION_SI SALTOS			{$$ = new Parser.yy.Nodo("INSTRUCCION",""); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| INSTRUCCION_SINO SALTOS		{$$ = new Parser.yy.Nodo("INSTRUCCION",""); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| MOSTRAR SALTOS				{$$ = new Parser.yy.Nodo("INSTRUCCION",""); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| PARA SALTOS					{$$ = new Parser.yy.Nodo("INSTRUCCION",""); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| MIENTRAS SALTOS				{$$ = new Parser.yy.Nodo("INSTRUCCION",""); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| DETENER SALTOS				{$$ = new Parser.yy.Nodo("INSTRUCCION",""); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| CONTINUAR SALTOS				{$$ = new Parser.yy.Nodo("INSTRUCCION",""); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| DIBUJAR_AST SALTOS			{$$ = new Parser.yy.Nodo("INSTRUCCION",""); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| DIBUJAR_EXP SALTOS			{$$ = new Parser.yy.Nodo("INSTRUCCION",""); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
	| DIBUJAR_TS SALTOS				{$$ = new Parser.yy.Nodo("INSTRUCCION",""); $$.agregarHijo($1); Parser.yy.LisIn.agregarNodo($$,contadorTabs); contadorTabs=0;}
;

DIBUJAR_AST
	: dib_ast par_a id par_c	{$$ = new Parser.yy.Nodo("DIBUJAR_AST",""); $$.agregarHijo(new Parser.yy.Nodo($1,"dib_ast")); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a")); $$.agregarHijo(new Parser.yy.Nodo($3,"id")); $$.agregarHijo(new Parser.yy.Nodo($4,"par_c"));}
;

DIBUJAR_EXP
	: dib_exp par_a EXP par_c	{$$ = new Parser.yy.Nodo("DIBUJAR_EXP",""); $$.agregarHijo(new Parser.yy.Nodo($1,"dib_exp")); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a")); $$.agregarHijo($3); $$.agregarHijo(new Parser.yy.Nodo($4,"par_c"));}
;

DIBUJAR_TS
	: dib_ts par_a par_c		{$$ = new Parser.yy.Nodo("DIBUJAR_TS",""); $$.agregarHijo(new Parser.yy.Nodo($1,"dib_ts")); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a")); $$.agregarHijo(new Parser.yy.Nodo($3,"par_c"));}
;

CONTINUAR
	: continuar 	{$$ = new Parser.yy.Nodo("CONTINUAR",""); $$.agregarHijo(new Parser.yy.Nodo($1,"continuar"));}
;

DETENER
	: detener 		{$$ = new Parser.yy.Nodo("DETENER",""); $$.agregarHijo(new Parser.yy.Nodo($1,"detener"));}
;

MIENTRAS
	: mientras par_a EXP par_c dos_p		{$$ = new Parser.yy.Nodo("MIENTRAS",""); $$.agregarHijo(new Parser.yy.Nodo($1,"mientras")); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a")); $$.agregarHijo($3); $$.agregarHijo(new Parser.yy.Nodo($4,"par_c")); $$.agregarHijo(new Parser.yy.Nodo($5,"dos_p"));}
;

PARA 
	: para par_a TIPO_VARIABLE_NATIVA id asig EXP pyc EXP pyc OP par_c dos_p  	{$$ = new Parser.yy.Nodo("PARA",""); $$.agregarHijo(new Parser.yy.Nodo($1,"para")); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a")); $$.agregarHijo($3); $$.agregarHijo(new Parser.yy.Nodo($4,"id")); $$.agregarHijo(new Parser.yy.Nodo($5,"asig")); $$.agregarHijo($6); $$.agregarHijo(new Parser.yy.Nodo($7,"pyc")); $$.agregarHijo($8); $$.agregarHijo(new Parser.yy.Nodo($9,"pyc")); $$.agregarHijo($10); $$.agregarHijo(new Parser.yy.Nodo($11,"par_c")); $$.agregarHijo(new Parser.yy.Nodo($12,"dos_p"));}
	| para par_a ASIGNACION pyc EXP pyc OP par_c dos_p							{$$ = new Parser.yy.Nodo("PARA",""); $$.agregarHijo(new Parser.yy.Nodo($1,"para")); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a")); $$.agregarHijo($3); $$.agregarHijo(new Parser.yy.Nodo($4,"pyc")); $$.agregarHijo($5); $$.agregarHijo(new Parser.yy.Nodo($6,"pyc")); $$.agregarHijo($7); $$.agregarHijo(new Parser.yy.Nodo($8,"par_c")); $$.agregarHijo(new Parser.yy.Nodo($9,"dos_p"));}
;

OP
	: inc  			{$$ = new Parser.yy.Nodo("OP",""); $$.agregarHijo(new Parser.yy.Nodo($1,"inc"));}
	| dec 			{$$ = new Parser.yy.Nodo("OP",""); $$.agregarHijo(new Parser.yy.Nodo($1,"dec"));}
;

MOSTRAR 
	: mostrar par_a LISTA_EXPRESIONES par_c {$$ = new Parser.yy.Nodo("MOSTRAR",""); $$.agregarHijo(new Parser.yy.Nodo($1,"mostrar")); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a")); $$.agregarHijo($3); $$.agregarHijo(new Parser.yy.Nodo($4,"par_c"));}
;

INSTRUCCION_SI
	: si par_a EXP par_c dos_p		{$$ = new Parser.yy.Nodo("INSTRUCCION_SI",""); $$.agregarHijo(new Parser.yy.Nodo($1,"si")); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a")); $$.agregarHijo($3); $$.agregarHijo(new Parser.yy.Nodo($4,"par_c")); $$.agregarHijo(new Parser.yy.Nodo($5,"dos_p"));}		
;

INSTRUCCION_SINO
	: sino dos_p	{$$ = new Parser.yy.Nodo("INSTRUCCION_SINO",""); $$.agregarHijo(new Parser.yy.Nodo($1,"sino")); $$.agregarHijo(new Parser.yy.Nodo($2,"dos_p"));}
;

RETORNO
	: retorno EXP  	{$$ = new Parser.yy.Nodo("RETORNO",""); $$.agregarHijo(new Parser.yy.Nodo($1,"retorno")); $$.agregarHijo($2);}
	| retorno 		{$$ = new Parser.yy.Nodo("RETORNO",""); $$.agregarHijo(new Parser.yy.Nodo($1,"retorno"));}
;

DECLARACIONES
	: TIPO_VARIABLE_NATIVA id										{$$ = new Parser.yy.Nodo("DECLARACION_VAR",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"id")); }
	| TIPO_VARIABLE_NATIVA id coma IDS asig EXP						{$$ = new Parser.yy.Nodo("DECLARACION_VAR",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"id")); $$.agregarHijo(new Parser.yy.Nodo($3,"coma"));  $$.agregarHijo($4); $$.agregarHijo(new Parser.yy.Nodo($5,"asig")); $$.agregarHijo($6);}	
	| TIPO_VARIABLE_NATIVA id asig EXP								{$$ = new Parser.yy.Nodo("DECLARACION_VAR",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"id")); $$.agregarHijo(new Parser.yy.Nodo($3,"asig"));  $$.agregarHijo($4);}
	| TIPO_VARIABLE_NATIVA id par_a par_c dos_p						{$$ = new Parser.yy.Nodo("DECLARACION_FUN",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"id")); $$.agregarHijo(new Parser.yy.Nodo($3,"par_a")); $$.agregarHijo(new Parser.yy.Nodo($4,"par_c")); $$.agregarHijo(new Parser.yy.Nodo($5,"dos_p")); }
	| TIPO_VARIABLE_NATIVA id par_a LISTA_PARAMETROS par_c dos_p	{$$ = new Parser.yy.Nodo("DECLARACION_FUN",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"id")); $$.agregarHijo(new Parser.yy.Nodo($3,"par_a")); $$.agregarHijo($4); $$.agregarHijo(new Parser.yy.Nodo($5,"par_c")); $$.agregarHijo(new Parser.yy.Nodo($6,"dos_p"));}
;


LISTA_PARAMETROS
  	: LISTA_PARAMETROS coma PARAMETRO 	{$$ = new Parser.yy.Nodo("LISTA_PARAMETROS",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"coma")); $$.agregarHijo($3);}
  	| PARAMETRO 						{$$ = new Parser.yy.Nodo("LISTA_PARAMETROS",""); $$.agregarHijo($1);}
;

PARAMETRO
  	: TIPO_VARIABLE_NATIVA id 	{$$ = new Parser.yy.Nodo("PARAMETRO",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"id"));}  
;

ASIGNACION
	: id TIPO_IGUAL EXP  		{$$ = new Parser.yy.Nodo("ASIGNACION",""); 	$$.agregarHijo(new Parser.yy.Nodo($1,"id")); $$.agregarHijo($2); $$.agregarHijo($3);}
; 

TIPO_IGUAL
	: asig 						{$$ = new Parser.yy.Nodo("TIPO_IGUAL",""); $$.agregarHijo(new Parser.yy.Nodo($1,"asig"));}
;

IDS
	: IDS coma id				{$$ = new Parser.yy.Nodo("IDS",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"coma")); $$.agregarHijo(new Parser.yy.Nodo($1,"id"));}
	| id 						{$$ = new Parser.yy.Nodo("IDS",""); $$.agregarHijo(new Parser.yy.Nodo($1,"id"));}
;

TIPO_VARIABLE_NATIVA
	: double  					{$$ = new Parser.yy.Nodo("TIPO_VARIABLE_NATIVA",""); $$.agregarHijo(new Parser.yy.Nodo($1,"double"));}
	| boolean 					{$$ = new Parser.yy.Nodo("TIPO_VARIABLE_NATIVA",""); $$.agregarHijo(new Parser.yy.Nodo($1,"boolean"));}
	| string 					{$$ = new Parser.yy.Nodo("TIPO_VARIABLE_NATIVA",""); $$.agregarHijo(new Parser.yy.Nodo($1,"string"));}
	| int 						{$$ = new Parser.yy.Nodo("TIPO_VARIABLE_NATIVA",""); $$.agregarHijo(new Parser.yy.Nodo($1,"int"));}
	| char 						{$$ = new Parser.yy.Nodo("TIPO_VARIABLE_NATIVA",""); $$.agregarHijo(new Parser.yy.Nodo($1,"char"));}
	| void 						{$$ = new Parser.yy.Nodo("TIPO_VARIABLE_NATIVA",""); $$.agregarHijo(new Parser.yy.Nodo($1,"void"));}
;

EXP
  //Operaciones Aritmeticas
  : menos EXP %prec umenos  	{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo(new Parser.yy.Nodo("-","negativo")); $$.agregarHijo($2);}
  | EXP mas EXP  				{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("+","suma")); $$.agregarHijo($3);}
  | EXP menos EXP 				{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("-","resta")); $$.agregarHijo($3);}
  | EXP por EXP					{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("*","producto")); $$.agregarHijo($3);} 
  | EXP div EXP					{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("/","division")); $$.agregarHijo($3);} 
  | EXP mod EXP					{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("%","mod")); $$.agregarHijo($3);} 
  | EXP pot EXP					{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("^","potencia")); $$.agregarHijo($3);} 
  | par_a EXP par_c 			{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($2);}
  //Operaciones de Comparacion
  | EXP mayor EXP  				{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo(">","mayor")); $$.agregarHijo($3);}
  | EXP menor EXP 				{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("<","menor")); $$.agregarHijo($3);}
  | EXP mayor_igual EXP 		{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo(">=","mayor_igual")); $$.agregarHijo($3);}
  | EXP menor_igual EXP 		{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("<=","menor_igual")); $$.agregarHijo($3);}
  | EXP igual EXP 				{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("==","igual")); $$.agregarHijo($3);}
  | EXP dif EXP					{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("!=","dif")); $$.agregarHijo($3);}
  | EXP sig_inc EXP 			{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("~","sig_inc")); $$.agregarHijo($3);}
  //Operaciones Lógicas
  | EXP and EXP 				{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("&&","and")); $$.agregarHijo($3);}					
  | EXP or EXP					{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("||","or")); $$.agregarHijo($3);}
  | EXP xor EXP 				{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo("|&","xor")); $$.agregarHijo($3);}	
  | not EXP 					{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo(new Parser.yy.Nodo("!","not")); $$.agregarHijo($2);}
  //Valores Primitivos
  | entero						{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo(new Parser.yy.Nodo($1,"ENTERO"));}
  | decimal						{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo(new Parser.yy.Nodo($1,"DECIMAL"));}
  | string						{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo(new Parser.yy.Nodo($1,"STRING"));}
  | id							{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo(new Parser.yy.Nodo($1,"ID"));}
  | true						{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo(new Parser.yy.Nodo($1,"TRUE"));}
  | false						{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo(new Parser.yy.Nodo($1,"FALSE"));}
  | cadena						{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo(new Parser.yy.Nodo($1,"CADENA"));}	
  | char_exp 					{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo(new Parser.yy.Nodo($1,"CHAR"));}
  //Funciones
  | LLAMADA_FUNCION 			{$$ = new Parser.yy.Nodo("EXP",""); $$.agregarHijo($1);}
;

LLAMADA_FUNCION
	: id par_a par_c 					{$$ = new Parser.yy.Nodo("LLAMADA_FUNCION",""); $$.agregarHijo(new Parser.yy.Nodo($1,"id")); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a")); $$.agregarHijo(new Parser.yy.Nodo($3,"par_c"));}
	| id par_a LISTA_EXPRESIONES par_c 	{$$ = new Parser.yy.Nodo("LLAMADA_FUNCION",""); $$.agregarHijo(new Parser.yy.Nodo($1,"id")); $$.agregarHijo(new Parser.yy.Nodo($2,"par_a")); $$.agregarHijo($3); $$.agregarHijo(new Parser.yy.Nodo($4,"par_c"));}
;

LISTA_EXPRESIONES
	: LISTA_EXPRESIONES coma EXP 		{$$ = new Parser.yy.Nodo("LISTA_EXPRESIONES",""); $$.agregarHijo($1); $$.agregarHijo(new Parser.yy.Nodo($2,"coma")); $$.agregarHijo($3);}
	| EXP 								{$$ = new Parser.yy.Nodo("LISTA_EXPRESIONES",""); $$.agregarHijo($1);}
;