def barras = BARS();
r = newLines();
r.add(barras);

def itens = barras.size();

for (int index = 1; index < itens; index++ ) {
	// Variaveis de apoio para o robo trader by isaac
	
	def barraPenultima = index == 1 ? barras.bar(index - 1) : barras.bar(index - 2);
	def barraAnterior = barras.bar(index - 1);
	def barraAtual = barras.bar(index);

	def maximaPenultima = barraPenultima.getHigh();
	def minimaPenultima = barraPenultima.getLow();

	def maximaAnterior = barraAnterior.getHigh();
	def minimaAnterior = barraAnterior.getLow();
	
	def minimaAtual = barraAtual.getLow();
	def maximaAtual = barraAtual.getHigh();

	def aberturaAnterior = barraAnterior.getOpen();
	def fechamentoAnterior = barraAnterior.getClose();
	def candleAnteriorPositivo = aberturaAnterior < fechamentoAnterior ? true : false;
	def pMin = aberturaAnterior > fechamentoAnterior ? fechamentoAnterior : aberturaAnterior;
	def pMax = aberturaAnterior < fechamentoAnterior ? fechamentoAnterior : aberturaAnterior;

	def aberturaAtual = barraAtual.getOpen();
	def fechamentoAtual = barraAtual.getClose();
	def candleAtualPositivo = aberturaAtual < fechamentoAtual ? true : false;
	def cMin = aberturaAtual > fechamentoAtual ? fechamentoAtual : aberturaAtual;
	def cMax = aberturaAtual < fechamentoAtual ? fechamentoAtual : aberturaAtual;

	def aberturaPenultima = barraPenultima.getOpen();
	def fechamentoPenultima = barraPenultima.getClose();
	def candlePenultimoPositivo = aberturaPenultima < fechamentoPenultima ? true : false;
	def aMin = aberturaPenultima > fechamentoPenultima ? fechamentoPenultima : aberturaPenultima;
	def aMax = aberturaPenultima < fechamentoPenultima ? fechamentoPenultima : aberturaPenultima;


	//Cor primária dos candles
	if (aberturaAtual > fechamentoAtual) {
		barraAtual.setFill(255,0,0);
		barraAtual.setBorder(255,0,0);
	} else {
		barraAtual.setFill(0,255,0);
		barraAtual.setBorder(0,255,0);
	}


	// ReverteCandle no topo

	if ((candlePenultimoPositivo && candleAnteriorPositivo && !candleAtualPositivo) && (maximaAnterior < maximaAtual)){
		barraAtual.setFill(165,34,255);
		barraAtual.setBorder(165, 34, 255);
		
	}

	// ReverteCandle no fundo
	if ((!candlePenultimoPositivo && !candleAnteriorPositivo && candleAtualPositivo) && (minimaAnterior > minimaAtual)){
		barraAtual.setFill(255,255,100);
		barraAtual.setBorder(255,255,100);
	}
}