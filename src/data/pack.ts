/**
 * This interface is the structure of the PACK medical procedures.
 * @param {string} titulo - The title of the procedure.
 * @param {number} pagina - The page number of the procedure.
 * @param {string} conteudo - The content of the procedure.
 */
export interface Pack {
  titulo: string
  pagina: number
  conteudo: string
}

/**
 * This const is the array of PACK medical procedures.
 * @param {string} titulo - The title of the procedure.
 * @param {number} pagina - The page number of the procedure.
 * @param {string} conteudo - The content of the procedure.
 * @returns {Arar[]} - The formatted procedure as an array of objects.
 *
 */
export const pack: Pack[] = [
  {
    titulo: 'Paciente com uma emergência',
    pagina: 24,
    conteudo: `
    1 Atenda o paciente com uma emergência:
        * Paciente responde à sua voz ou estímulo físico?

    1.1 Não:
        * Chame ajuda, contate o SAMU (192) e, se disponível, providencie um desfibrilador.
        * Procure o pulso (carotídeo ou femoral) por no máximo 10 segundos:

    1.1.1 Sem pulso ou não tem certeza:
        * Inicie RCP (Se paciente tem uma doença terminal, considere se deve ou não prosseguir. Se RCP não for necessária, pois paciente está em cuidados paliativos, ver texto 167).
        * Faça ciclos de 30 compressões torácicas e 2 respirações (na velocidade de 100-120 compressões por minuto).
        * Se desfibrilador disponível, verifique ritmo. Se chocável, aplique 1 choque e retome RCP imediatamente.
        * Aplique adrenalina 1 mg (1:1000) EV, seguida de lavagem com 5 mL de soro fisiológico. Repita cada 3-5 minutos.
        * Se desfibrilador disponível, verifique ritmo cada 2 minutos (5 ciclos) e aplique choque se necessário. Se não disponível/não chocável, verifique pulso:
        * Se pulso cheio retornar, pare RCP e verifique respiração (ver abaixo).
        * Se sem pulso, continue RCP por pelo menos 30 minutos (Continue RCP por mais tempo se temperatura <35°C, afogamento, envenenamento ou overdose de medicamentos).

    1.1.2 Paciente com pulso. O paciente está respirando?
    1.1.2.1 Não:
        * Verifique se as vias aéreas estão desobstruídas.
        * Faça 1 respiração a cada 6 segundos com balão de oxigênio e máscara.
        * Verifique pulso a cada 2 minutos. Se sem pulso, inicie RCP (veja acima).

    1.1.3 Paciente com pulso e respirando: Avalie e maneje via aérea, respiração, circulação e nível de consciência:
    1.1.3.1 Via aérea:
        * Se via aérea obstruída (roncos, gargarejos, ruídos respiratórios), abra com manobra de inclinação da cabeça e elevação do queixo. Se trauma, faça ao invés a manobra de elevação da mandíbula, mantendo o pescoço estável.
        * Remova corpos estranhos da boca e faça sucção de fluídos.
        * Se inconsciente, insira cânula orofaríngea. Se houver resistência, engasgo ou vômito, utilize uma cânula nasofaríngea lubrificada.
        * Intube se incapaz de manter via aérea com cânula.

    1.1.3.2 Respiração:
        * Se falta de ar ou SaO2 < 90%, aplique oxigênio 1-6 L/min via cânula nasal.
        * Se FR < 9 ou lábios/língua azul(is), conecte bolsa-válvula-máscara ao oxigênio e ventile lentamente a cada respiração com o paciente.
        * Intube se ainda tiver dificuldade para respirar, SaO2 < 90% ou lábios/língua azul(is).
        * Se falta de ar súbita, ruídos respiratórios diminuídos/mais ressonantes/dor em um dos lados, com desvio de traqueia: provável pneumotórax hipertensivo:
        * Insira um cateter calibre 14 acima da 3ª costela na linha médio clavicular. Providencie um dreno torácico.

    1.1.3.3 Circulação:
        * Estabeleça acesso EV.
        * Se PAS < 90, FC ≥ 100 ou sangramento intenso: aplique cloreto de sódio 0,9% 250 mL EV rápido, repita até PAS > 90. Pare se houver falta de ar ou novas crepitações pulmonares.
        * Pare sangramento: aplique pressão e eleve membros. Se sangramento intenso persistir, aplique torniquete acima do ferimento.

    1.1.3.4 Nível de consciência:
        * Pontuação na Escala de Coma de Glasgow (ECG): Some os pontos abaixo para ter um único resultado de até 15 pontos: Se ECG ≤ 8, intube o paciente.
        * Melhor resposta motora
        Obedece comandos - 6
        Localiza a dor - 5
        Retira o estímulo à dor - 4
        Flexão anormal à dor - 3
        Extensão à dor - 2
        Nenhuma - 1

        * Melhor resposta verbal
        Orientado - 5
        Confuso - 4
        Palavras inapropriadas - 3
        Sons incompreensíveis - 2
        Nenhuma - 1

        * Abertura ocular
        Espontânea - 4
        Ao chamado - 3
        Na dor - 2
        Nenhuma - 1

    2 Seguimento do cuidado. Continue o manejo de acordo com o problema e os sintomas:
        * Se pupilas assimétricas ou com pouca resposta à luz, eleve a cabeça em 30 graus. Se ferido, mantenha o corpo reto e incline elevando a cabeça (não curve a coluna).
        * Imobilize o pescoço com colar cervical rígido (se disponível) e sacos de areia/blocos em ambos os lados da cabeça/pescoço se paciente ferido e >1: lesão na cabeça, ECG < 15, sensibilidade no pescoço/coluna, membro fraco/dormente ou pupilas anormais. Use prancha de imobilização se necessário para mover o paciente.
        * Identifique todos os ferimentos e procure causas: desnude o paciente e avalie frente e costas. Se ferido, utilize rolagem para virar. Então cubra e mantenha aquecido.
        * Continue avaliando o paciente de acordo com os sintomas. Se inconsciente (ver texto 25). Se ferido (ver texto 27).

    As alterações destacam alguns aspectos médicos importantes e clarificam o texto, mantendo o seu fluxo. Se tiver mais detalhes a serem ajustados ou outras seções do fluxograma, estou à disposição para ajudar!
    `
  },
  {
    titulo: 'Diminuição do nível de consciência',
    pagina: 25,
    conteudo: `
      1.           Atenda com urgência paciente com diminuição do nível de consciência:
      * Primeiro avalie e maneje vias aéreas, respiração, circulação e nível de consciência (Texto 24)
      * Identifique todos os ferimentos e procure causas: desnude paciente e avalie frente e costas. Se ferido, utilize rolagem para evitar movimentos de coluna em casos de trauma. Então cubra e mantenha aquecido.
      * Se convulsões, ferimentos ou queimaduras, também maneje conforme página do sintoma.
      * Se início súbito de rebaixamento do nível de consciência e > 1: coceira/rash generalizado, edema de face/língua, falta de ar, dor abdominal intensa, vômito persistente ou exposição à possível alérgeno (Alérgeno pode ser: picada de inseto, ingestão de um medicamento ou uma comida nova nas últimas horas.), considere anafilaxia (Texto 29)
      
      2.           Verifique glicemia, temperatura e pupilas:
      
      2.1.               Glicemia
      2.1.1        < 70 mg/dL?
      * Aplique glicose 50% 25mL EV em 1-3 minutos.
      * Repita se glicemia ainda < 70mg/dL após 15 minutos.
      * Se alcoolismo/malnutrição também aplique tiamina 200mg EV.
      * Continue glicose 5% 1L EV a cada 6 horas.
      
      2.1.2.         Glicemia > 200mg/dL?
      * Aplique cloreto de sódio 0,9% 20mL/Kg EV na primeira hora, então 10mL/Kg/hora EV até encaminhamento. Pare se surgirem falta de ar ou novas crepitações pulmonares.
      
      2.2.              Temperatura
      2.2.1.         ≤ 35°C
      * Remova roupas frias/molhadas e cubra com cobertores quentes.
      * Aqueça fluidos EV a 40oC (evite fluidos frios).
      * Se não responder ou temperatura ≤ 32°C, também use aquecedor externo.
      
      2.2.2.         Temperatura ≥ 38°C
      * Aplique ceftriaxona 2g IM.
      * Se temperatura > 40°C:
      o   Remova roupas.
      o   Use ventilador e spray de água para resfriar paciente.
      o   Aplique pacotes de gelo nas axilas, virilha e pescoço.
      o   Pare assim que temperatura < 39°C.
      
      2.3.              Pupilas
      2.3.1.         Ambas pupilas igualmente diminuídas (miose)
      2.3.1.1.            Se uso de drogas ilícitas e/ou FR < 12 - Provável overdose por opioides.
      * Aplique oxigênio via cânula nasal (1-2L/min). Se disponível, aplique naloxona 0,4mg EV. Repita cada 2-3 minutos, aumente dose em 0,4mg cada vez até FR >12, máximo de 10mg.
      * Discuta ou contate o Centro de Informações Toxicológicas (0800 643 5252) ou Disque-Intoxicação (0800 722 6001).
      
      2.3.1.2.            Se secreções excessivas ou contraturas musculares - Provável envenenamento por organofosforado.
      * Se disponível, aplique atropina 2mg EV. Repita cada 5 minutos, dobrando dose cada vez, até secreções controladas.
      * Remova roupas contaminadas e lave a pele.
      * Discuta ou contate o Centro de Informações Toxicológicas (0800 643 5252) ou Disque-Intoxicação (0800 722 6001).
      
      2.3.2.         Ambas pupilas igualmente dilatadas (midríase) – Provável overdose por drogas estimulantes.
      * Discuta ou contate o Centro de Informações Toxicológicas (0800 643 5252) ou Disque-Intoxicação (0800 722 6001).
      
      2.3.3.         Assimétricas ou com pouca resposta à luz
      * Erga a cabeça em 30 graus. Se ferido, mantenha o corpo reto e incline elevando a cabeça (não curve a coluna).
      
      3.                 Cuidados adicionais.
      * Encaminhe com urgência.
      * Enquanto aguarda a remoção:
      o   Verifique PA, FC, FR, SaO2 e nível de consciência (Glasgow) a cada 15 minutos. Insira cateter urinário, se disponível.
      o   Se PAS < 90, FC > 100, FR > 20 ou < 9, SaO2 < 90% ou queda no nível de consciência (Glasgow), reavalie e maneje vias aéreas, respiração, circulação e nível de consciência (Texto 24).
      `
  },
  {
    titulo: 'Avalie e maneje glicemia capilar aleatória',
    pagina: 26,
    conteudo: `
         1   Se diabetes conhecida (ver texto 133). Somente verifique glicemia capilar aleatória se paciente não está bem ou tem sintomas de diabetes (sede, aumento de frequência urinaria, perda de peso).
         
         2   Interpretação e manejo de glicemia capilar aleatória em paciente que não tem diabetes conhecida:
         
         2.1  < 55 mg/dL - Paciente tem hipoglicemia
         * Paciente está alerta?
         
         2.1.1   Sim
         * Dê glicose via oral - Uma colher de sopa de açúcar (pode ser diluída em 1 copo de água) ou meio copo de suco/refrigerante com açúcar.
         * Se incapaz de ingerir, aplique glicose 50% 25mL EV em 1-3min.
         * Verifique glicose após 15 minutos:
         * Se glicemia persistir < 55 mg/dL, dê glicose (oral ou EV) novamente e verifique após 15 minutos. Se ainda < 55, repita glicose via oral ou EV e discuta.
         * Quando glicemia estiver > 55 mg/dL, discuta para investigar a causa.
         
         2.1.2   Não
         * Se alcoolismo ou desnutrição, aplique tiamina 200mg IM.
         * Aplique glicose 50% 25mL EV em 1-3min.
         * Se inconsciente (texto 25)
         * Se convulsionando (texto 28)
         * Verifique glicose após 15 minutos
         * Se glicemia persistir < 55 mg/dL, aplique novamente glicose 50% 25mL EV em 1-3min e continue glicose 5% 1L EV cada 6 horas. Neste caso encaminhe com urgência
         * Quando glicemia estiver > 55 mg/dL, discuta para investigar a causa.
         
         2.2 Glicemia entre 55-129 mg/dL – Verifique necessidade de rastrear diabetetes (texto 131)
         
         
         2.3 Glicemia entre 130-199 mg/dL - Solicite glicemia após jejum de 8 horas e verifique resultado.
         
         2.3.1 < 110
         * Repita glicemia de jejum após 1 ano.
         * Avalie e maneje risco cardiovascular (Texto 128)
         
         2.3.2 110-125
         * Risco aumentado para diabetes
         * Repita glicemia de jejum
         
         2.3.2.1  <126
         * Repita glicemia de jejum após 1 ano.
         * Avalie e maneje risco cardiovascular (Texto 128)
         
         2.3.2.2   >126
         * Realize uma segunda glicemia de jejum para confirmar a diabetes se a primeira for ≥ 126 (2 glicemias de jejum > 126 confirmam diabetes)
         
         2.3.2.2.1  Se confirmar >126 mg/dL ou mais
         * Diagnostique diabetes
         * Se < 35 anos, considere diabetes tipo 1 e discuta.
         * Se ≥ 35 anos, ofereça cuidados de rotina para diabetes (Texto 133).
         
         2.3.2.2.2   Se <126 mg/dL na confirmação
         * Repita glicemia de jejum após 1 ano.
         * Avalie e maneje risco cardiovascular (Texto 128)
         
         2.4   Glicemia > 200 mg/dL
         Tem algum dos sintomas abaixo, indicando necessidade de atenção urgente:
         * Diminuição da consciência (Texto 25)
         * Dor no peito (Texto 78)
         * Convulsões (Texto 28)
         * Confusão
         * Sonolência
         * Respiração rápida
         * Náuseas ou vômitos
         * Dor abdominal
         * Temperatura ≥ 38oC
         * Desidratação (Sede sucessiva, mucosas secas, turgor da pele diminuído, olhos encovados, PAS < 90, FC > 100)
         
         2.4.1     Não
         * Tem sintomas de diabetes: sede, aumento da frequência urinária, perda de peso?
         
         2.4.1.1   Não – Seguir conduta conforme o item 2.3
         
         2.4.1.2   Sim – Diagnostique Diabetes
         * Se < 35 anos, considere diabetes tipo 1 e discuta.
         * Se ≥ 35 anos, ofereça cuidados de rotina para diabetes (Texto 133).
         
         
         2.4.2     Sim
         * Aplique cloreto de sódio 0,9% 20mL/Kg EV na primeira hora, então 10mL/Kg/hora EV até encaminhamento. Interrompa se surgirem sinais de sobrecarga hídrica, como falta de ar ou crepitações pulmonares novas.
         * Encaminhe com urgência.
         `
  },
  {
    titulo: 'Tosse ou falta de ar',
    pagina: 49,
    conteudo: `
         1.           Atender com Urgência se o Paciente Apresentar:
         *                     Cianose (face/lábios azulados)
         *                    FC ≥ 100
         *                    Falta de ar súbita, ruídos respiratórios diminuídos/mais ressonantes/dor em um dos lados, desvio de traqueia, PAS < 90, suspeita de pneumotórax hipertensivo
         *                    Sibilos/aperto no peito (Texto 50)
         *                    Falta de ar ao deitar com edema em pernas, suspeita de insuficiência cardíaca (Texto 139)
         *                    Respiração rápida e profunda com glicemia >200mg/dl (Texto 26)
         *                    Falta de ar em repouso, falar ou com sinais de esforço (tiragens intercostais, batimento asa do nariz)
         *                    FR ≥ 30 ou SaO2 < 90% (Certifique-se que paciente não está usando esmalte/unha postiça e que oxímetro está bem-posicionado, fixo e estabilizado. Se SaO2 91-94% e sem outros sinais/sintomas sugerindo emergências, discuta para decidir se aplicar O2 e encaminhar com urgência.)
         *                    Tosse com sangue vivo
         *                    Confusão mental
         *                    PAS < 90
         *                    Edema e dor em uma panturrilha
         
         1.1.               Manejo e Encaminhamento com Urgência:
         *                     Aplicar oxigênio via cânula nasal 1-6L/min para alvo inicial SaO2 > 94% e meta 90-96% (se DPOC, 88-92%; se gestante, 92-95%). Se 6L/min e fora do alvo/sem melhora, usar máscara com reservatório e aumentar até 15L/min.
         *                    Se pneumotórax hipertensivo: inserir cateter calibre 14 acima da 3ª costela na linha médio clavicular. Contatar SAMU (192) e providenciar dreno torácico.
         *                    Se PAS < 90, aplicar cloreto de sódio 0,9% 500mL EV em 30 minutos, repetir até PAS > 90 ou até 3L. Parar se falta de ar piorar ou novas crepitações pulmonares.
         *                    Se temperatura ≥ 38°C e remoção demorar > 2 horas: aplicar ceftriaxona 1g IM para possível pneumonia bacteriana grave.
         
         2.         Abordagem para Pacientes sem Necessidade de Atenção Urgente:
         * Perguntar sobre a duração da tosse. Se fatores de risco para HIV tais como: profissional de saúde, pessoa em situação de rua, privada de liberdade/institucionalizada, indígena, imigrante, considerar investigar TB se o paciente tiver tosse independente de duração e sem outra causa provável.
         
         2.1.              Tosse < 3 semanas e não recorrente:
         * Considerar COVID-19 (acho que não precisamos mais)
         * Tem tosse com secreção/escarro e mais 1: FC ≥ 100 ou Tax ≥ 38°C?
         
         2.1.1.          Se sim: provável pneumonia (confirme com crepitação pulmonar/respiração brônquica na ausculta ou RX de tórax).
         * Há risco de infecção grave? (Idade > 65 anos, HIV ou DM mal controlados, doença renal/hepática/autoimune/câncer ou uso de antibiótico nos últimos 3 meses ou alcoolismo)
         2.1.1.1.            Não: dê amoxicilina 500mg cada 8 horas por 7 dias. Se alergia à penicilina, dê ao invés azitromicina 500mg no dia por 3 dias.
         * Reavaliar em 48h: se não melhorar, discutir/encaminhar.
         * Se > 50 anos, solicitar RX de tórax e discutir.
         2.1.1.2.            Sim: amoxicilina/clavulanato 500/125mg 1g cada 8 horas 5 dias + azitromicina 500mg ao dia por 3 dias. Se alergia à penicilina, discuta alternativas; ou dê ao invés se disponível, levofloxacina 750mg ao dia por 5-7 dias.
         * Reavaliar em 48h: se não melhorar, discutir/encaminhar.
         *  Se > 50 anos, solicitar RX de tórax e discutir.
         2.1.2.          Se não:
         * Se DPOC e aumento de escarro ou mudança cor (amarela/verde): dê antibióticos (Texto 127).
         * Se não tiver DPOC, provável bronquite aguda: tranquilize que antibióticos não são necessários. Oriente retornar se sintomas piorarem, nova febre ou não melhora em 2-3 semanas.
         
         2.2.              Tosse/falta de ar ≥ 3 semanas (ou ≥ 2 semanas se DM) ou tem episódios recorrentes:
         * Excluir tuberculose
         2.2.1.          Considerar também outras causas de tosse ou falta de ar:
         2.2.1.1.            HIV com CD4 < 200 e tosse seca, piora da falta de ar aos esforços
         * Provável pneumocistose (PPC). Encaminhe no mesmo dia para RX de tórax e discuta tratamento.
         2.2.1.2.            Tabagista ou parou < 1 ano:  
         * Motivar para parar.
         * Se perda de peso, considere câncer de pulmão: solicitar RX de tórax e discutir.
         * Se tosse com escarro na maioria dos dias por 3 meses por ≥ 2 anos, provável bronquite crônica: solicite rx de tórax, espirometria e discuta.
         2.2.1.3.            Infecção das vias aéreas superiores (IVAS) recente, sem falta de ar
         * Provável tosse pós-infecciosa. Aconselhe que a tosse pode durar até 8 semanas.
         2.2.1.4.            Se coriza/obstrucao nasal (Texto 45). Se usa enelapril, discuta
         2.2.1.5.            Se sibilos, aperto no peito ou falta de ar, considere também asma ou DPOC (adaptei organização para ficar melhor)
         2.3.              Se paciente tem uma doença incurável, ofereça cuidado paliativo (Texto 167). Se diagnóstico incerto/pouca resposta ao tratamento, discutir para considerar DRGE, pneumonia atípica e outras causas.
         
         `
  },
  {
    titulo: 'Sibilos/aperto no peito',
    pagina: 50,
    conteudo: `
         1. Ir para textos específicos:
         * Anafilaxia - Se houver início súbito de sibilos/aperto no peito e mais 1: rash/coceira generalizada, edema de face/língua, PAS < 90, desmaio, dor abdominal/vômito persistente ou exposição à possível alérgeno (picada de inseto, ingestão de um medicamento ou uma comida nova nas últimas horas), considere anafilaxia (Texto 29).
         * Insuficiência cardíaca - Se falta de ar pior ao deitar e edema em pernas, provável insuficiência cardíaca (Texto139).
         
         2.           Atenda com urgência paciente com sibilos/aperto no peito:
         * Avalie a gravidade do episódio:
         * Qualquer um dos seguintes está presente? FR > 30, SaO2 < 90, FC > 120, incapaz de falar frase completa, usa musculatura respiratória acessória, sem ruídos na ausculta (aperto no peito mas sem sibilos), agitação, sonolência ou confusão.
         2.1.              Um ou mais dos sintomas acima presentes: Tratar como asma grave.
         * Encaminhe com urgência.
         * Enquanto aguarda transporte:
         - Aplique bromidrato de fenoterol 5mg/mL 10-20 gotas em 4mL de cloreto de sódio 0,9% via nebulizador com oxigênio 6L/min cada 20 minutos (ou continuamente, se necessário) ou aplique, alternativamente salbutamol 400-800mcg (4-8 jatos) via espaçador cada 20 minutos.
         - Se optou por salbutamol, aplique oxigênio 1-4L/min via cânula nasal, almeje SaO2 entre 93-95% (se DPOC conhecida, considere SaO2 entre 88-92%).
         - Se em cânula nasal a 4L/min e SaO2 < 93% (se DPOC conhecida, SaO2 < 88%), coloque máscara com reservatório e eleve fluxo de O2 até 15L/min, para atingir meta de SaO2.
         - Aplique brometo de ipratrópio 0,25mg/mL 20-40 gotas via nebulizador a cada 20 minutos (ou mais frequente se necessário).
         - Se ainda não tiver feito, dê prednisona 40mg oral. Se não for possível medicamento oral, aplique ao invés hidrocortisona 100mg EV.
         
         2.2.              Sem nenhum dos sintomas de gravidade acima: Tratar como crise leve a moderada
         * Aplique salbutamol 400-1000mcg (4-10 jatos) via espaçador. Se espaçador não disponível ou paciente incapaz de usar inalador com espaçador, aplique bromidrato de fenoterol 5mg/mL 10-20 gotas em 4mL de cloreto de sódio 0,9% via nebulizador com oxigênio (6L/min). Se não melhorar, repita a cada 20 minutos durante a primeira hora.
         * Se asma/DPOC conhecido, dê prednisona 40mg oral.
         * Monitore resposta regularmente.
         2.2.1.          Paciente piorando apesar do tratamento: Tratar como asma grave conforme as recomendações acima.
         2.2.2.          Paciente melhorando ou sem mudança na primeira hora.
         * Verifique frequência respiratória. O paciente consegue falar normalmente? Se não conseguir falar normalmente ou frequência respiratória > 20, tratar como asma grave.
         2.2.2.1.            Consegue falar normalmente e frequência respiratória ≤ 20?
         2.2.2.1.1.        Sibilo/aperto no peito resolvido. Se primeiro episódio de sibilo/aperto no peito, avalie para asma e DPOC (Texto 125). Se asma/DPOC conhecida, ofereça cuidados de rotina: se asma (Texto 126), se DPOC (Texto127).
         2.2.2.1.2.        Sibilo/aperto no peito ainda presente.
         * Repita salbutamol cada hora ou se necessário.
         * Se sibilo/aperto no peito ainda presente após 3 horas, continue salbutamol e discuta ou encaminhe.
         * Sibilo/aperto no peito resolvido após novas medidas. Se primeiro episódio de sibilo/aperto no peito, avalie para asma e DPOC (Texto 125). Se asma/DPOC conhecida, ofereça cuidados de rotina: se asma (Texto 126), se DPOC (Texto127).
         `
  },
  {
    titulo: 'Dor abdominal',
    pagina: 58,
    conteudo: `
         1.           Atenda com urgência paciente com dor abdominal e um ou mais dos seguintes sinais/sintomas:
         * Glicemia > 200 (Texto 26)
         * Dor em quadrante inferior direito com náusea/vômito/febre: provável apendicite
         * Dor forte no quadrante superior direito com náusea/febre/perda de apetite: provável colecistite
         * Se início súbito de dor abdominal e mais 1: rash/coceira generalizada, edema de face/língua, PAS < 90, desmaio ou exposição à possível alérgeno: considere anafilaxia (Texto 29)
         * Não consegue urinar (Texto 74)
         * Dor no peito (Texto 48)
         * Gestante, ou 1 semana após o parto, e PA ≥ 140/90 (Texto159)
         * Recente término da gestação/aborto/parto (Texto 164)
         * Gestante e sangramento vaginal (Texto 159)
         * Dor abdominal superior súbita irradiando para costas com náusea/vômito: provável pancreatite
         * Dor intensa e massa abdominal pulsátil: provável aneurisma de aorta abdominal roto
         * Defesa, rigidez ou dor à descompressão súbita do abdome: provável peritonite
         * Icterícia
         * Sem evacuações ou gases nas últimas 24 horas com/sem vômito
         
         1.1.              Maneje e encaminhe com urgência:
         * Se PAS < 90 ou provável pancreatite, aplique cloreto de sódio 0,9% 500mL EV rápido, repita até PAS > 90, continue 1L cada 4 horas. Pare se falta de ar ou novas crepitações pulmonares.
         * Se provável aneurisma de aorta abdominal roto: não aplique fluidos EV mesmo se PA < 90/60 (elevar a PA pode piorar a ruptura).
         * Se dor forte, aplique morfina 10mg IM ou morfina diluída 3-10mg EV lento (Dilua 10mg de morfina com 9mL de cloreto de sódio 0,9%. Aplique morfina diluída 3mL EV em 3 min (1mL/min). até 10 ml). Pare se PAS < 90.
         
         2.         Abordagem do paciente dor abdominal que não necessita de atenção urgente:
         * Se cólicas com vômitos, diarreia, perda de apetite, dor no corpo ou febre, provável gastroenterite (Texto 59).
         * Se sintomas urinários (Texto 74).
         
         2.1.              Paciente tem dor abdominal baixa e tem vagina/útero?
         2.1.1.         Sim:
         * Se amenorreia ou sangramento vaginal anormal, exclua gravidez: se positivo, discuta no mesmo dia.
         * Se cólica abdominal baixa durante menstruação, provável dismenorreia (Texto 70).
         * Pergunte sobre corrimento vaginal anormal e faça palpação bimanual para verificar dor mobilização colo:
         
         2.1.1.1.            Presença de corrimento vaginal anormal ou dor à mobilização do colo: Provável doença inflamatória pélvica
         * Prescreva ceftriaxona 500mg IM dose única e doxiciclina 100mg a cada 12 horas via oral por 14 dias e metronidazol (Evitar álcool até 24 horas após metronidazol via oral) 500mg via oral a cada 12 horas por 14 dias.
         * Para dor, prescreva paracetamol ou dipirona (Não prescreva se alergia previa) 500- 1000mg cada 6 horas se necessário. Se não melhora, dê ibuprofeno (Tomar com alimentação. Não prescreva se úlcera péptica, reação alérgica ou exacerbação de asma com uso, doença renal, gestação. Considere associar omeprazol 20mg em jejum se HAS, diabetes, insuficiência cardíaca, ≥ 65 anos, dispepsia, úlcera péptica prévia, uso de AAS, corticosteroides, varfarina, abuso de álcool) 300-600mg cada 8 horas ate 5 dias.
         * Se não responder, prescreva também ibuprofeno4 300- 600mg cada 8 horas até 5 dias.
         * Trate parcerias sexuais últimos 60 dias (Texto 62).
         * Se usa DIU, não precisa remover. Se optar remover, remova após 2 doses do tratamento.
         * Reavalie em 3 dias de tratamento. Se não melhorar ou diagnóstico incerto discuta ou encaminhe.
         
         2.1.1.2.            Sem corrimento vaginal anormal e sem dor à mobilização do colo.
         * Se perda de peso (Texto 32).
         * Se eliminação vermes: se tênia/segmentos, discuta opções de tratamento. Se outro parasita/incerto, dê albendazol 400mg (se gestante, discuta opções), repita dose em 14 dias (trate familiares junto). Eduque higiene pessoal.
         * Se constipação e/ou diarreia com dor recorrente que alivia com fezes ou gases, provável síndrome do intestino irritável: avalie e maneje o estresse (Texto 101); evite cafeína, leite/lacticínios; se dor, considere hioscina 10-20mg cada 6 horas até 5 dias, se necessário.
         * Se constipação (Texto 61).
         * Se diarreia (Texto 60).
         * Se não melhorar ou diagnóstico incerto, discuta/encaminhe.
         
         2.1.2.         Não (sem dor abdominal baixa na presença de vagina/útero):
         * paciente tem dor epigástrica que piora com a alimentação, fome ou deitado/inclinado para a frente?
         
         2.1.2.1.            Sim: provável dispepsia/azia
         * Oriente evitar café/bebida com gás/alimento gorduroso, condimentado ou ácido e, se sintomas noturnos, elevar cabeceira da cama e evitar comer tarde à noite.
         * Pare AINEs e discuta sobre parar AAS. Pergunte sobre uso de tabaco e álcool. Se fuma tabaco (Texto146). Se bebe álcool ≥ 4 doses(Uma dose é 50mL (um copinho) de destilados, 125mL (uma taça pequena) de vinho ou 330mL (uma lata ou garrafinha) de cerveja)/sessão (Texto145).
         * Avalie e maneje o estresse (Texto 101). Ofereça acupuntura, se disponível.
         * Se circunferência abdominal > 88cm (mulher) ou 102cm (homem), incentive perda de peso e avalie risco cardiovascular (Texto 128).
         * Prescreva omeprazol 20mg ao dia por 4 semanas. Se baixa resposta, aumente para 40mg ao dia. Considere hidróxido de alúminio 60mg/ mL 10mL (2 colheres de chá) 3-6 vezes/dia se necessário. Se sem resposta após 8 semanas, discuta e considere tratar H Pylori (discuta para decidir se trata mesmo sem EDA/confirmação diagnóstica).
         * Se ≥ 60 anos, perda de peso inexplicada, dificuldade progressiva de engolir, massa abdominal ou vômitos persistentes/com sangue, anemia ou sangue vivo/oculto em fezes, linfadenopatia, pai/mãe/irmão com câncer de esôfago/estômago: solicite EDA e interprete.
         * Se não melhorar ou diagnóstico incerto, discuta/encaminhe.
         
         2.1.2.2.            Não:
         * Se perda de peso (Texto 32).
         * Se eliminação vermes: se tênia/segmentos, discuta opções de tratamento. Se outro parasita/incerto, dê albendazol 400mg (se gestante, discuta opções), repita dose em 14 dias (trate familiares junto). Eduque higiene pessoal.
         * Se constipação e/ou diarreia com dor recorrente que alivia com fezes ou gases, provável síndrome do intestino irritável: avalie e maneje o estresse (Texto 101); evite cafeína, leite/lacticínios; se dor, considere hioscina 10-20mg cada 6 horas até 5 dias, se necessário.
         * Se constipação (Texto 61).
         * Se diarreia (Texto 60).
         * Se não melhorar ou diagnóstico incerto, discuta/encaminhe.
         
         `
  },
  {
    titulo: 'Náuseas ou vômitos',
    pagina: 59,
    conteudo: `
            1. Atenda com urgência paciente com náuseas ou vômitos e um ou mais dos seguintes sinais/sintomas:


            * Dor de cabeça (Texto 41)  
            * Dor no peito (Texto 48)  
            * Dor abdominal superior súbita e intensa irradiando para as costas: provável pancreatite  
            * *Pressão Arterial Sistólica (PAS) < 90 mmHg*  
            * Defesa, rigidez ou dor à descompressão súbita do abdome: provável peritonite  
            * Dor abdominal em quadrante inferior direito com febre: provável apendicite  
            * Rigidez de nuca/meningismo ou rash purpúrico: provável meningite  
            * Vômitos sanguinolentos  
            * Icterícia  
            * Dor/distensão abdominal e sem evacuações ou gases por mais de 24h  
            * Sonolência/confusão/respiração rápida profunda  
            * Se início súbito de coceira/rash generalizado, edema de face/língua, sibilos, falta de ar, PAS < 90, tontura/desmaio, dor abdominal intensa, considere anafilaxia (Texto 29)


            1.1. Maneje e encaminhe com urgência:  
            * Se provável meningite, aplique ceftriaxona 2g IM.  
            * Se PAS < 90 ou provável pancreatite, aplique cloreto de sódio 0,9% 500mL EV rápido, repita até PAS > 90, continue 1L cada 4 horas. Pare se houver falta de ar ou novas crepitações pulmonares.  
            * Se vômitos persistentes: dê metoclopramida 10mg oral ou aplique EV. Se dor intensa, aplique morfina 10mg IM ou morfina diluída 3-10mg EV lento (Dilua 10mg de morfina com 9mL de cloreto de sódio 0,9%. Aplique morfina diluída 3mL EV em 3 min (1mL/min). Se necessário, aplique mais 1mL/min até melhora, até 10mL), pare se PAS < 90.  
            * Verifique glicemia: se < 55 ou > 200 (Texto 26) ou se diabetes e < 70 (Texto 131).


            2. Abordagem do paciente com vômitos ou náuseas que não necessita de atenção urgente:  
            * Se sede, boca seca, turgor da pele diminuído ou Frequência Cardíaca (FC) ≥ 100, provável desidratação: dê metoclopramida 10mg VO/IM/EV ou dimenidrinato 50-100mg VO e solução de reidratação oral: goles pequenos (meta: 1-2L em 2h). Se vômito, tente mais devagar. Se incapaz de beber, aplique cloreto de sódio 0,9% 250mL EV rápido. Se sem melhora após reidratação EV ou 2h de VO, encaminhe no mesmo dia.  
            * Exclua gravidez. Se gestante, tranquilize que náusea/vômitos são comuns no 1o trimestre. Oriente refeições pequenas, leves, frequentes e evitar comidas/cheiros que causem náuseas. Consumo de gengibre e acupressão (3 dedos acima do pulso em região anterior) podem ajudar. Se não melhorar, prescreva dimenidrinato 50-100mg ou metoclopramida 10 mg cada 8 horas se necessário por até 5 dias. Se vômitos persistentes, discuta. Ofereça cuidados de pré-natal (Texto 159).  
            * Se tontura associada (Texto 40).  
            * Revise medicamentos: AINEs, metformina, contraceptivos, terapia hormonal, teofilina, quimioterapia e morfina podem causar náuseas/vômitos. Se em tratamento para TB (Texto 114) ou em TARV (Texto 121).  
            * Rastreie uso de álcool/drogas: no último ano: 1) bebeu ≥ 4 doses2/vez, 2) usou drogas ilegais ou 3) abusou de medicamentos com/sem prescrição? se sim para qualquer um (Texto 145).


            3. Paciente refere vômitos de início recente com cólicas abdominais, diarreia, perda de apetite, dor no corpo ou febre?


            3.1. Sim: provável gastroenterite  
            * Prescreva metoclopramida 10mg ou dimenidrinato 50-100mg cada 8 horas se necessário até 5 dias.  
            * Prescreva soro de reidratação oral.  
            * Oriente beber bastante líquidos, comer refeições leves, pequenas e frequentes e evitar comida gordurosa.  
            * Oriente retornar se piora, vômitos > 3 dias ou não consegue ingerir líquidos.


            3.2. Não: paciente tem dor epigástrica que piora com a alimentação, fome ou deitado/inclinado para a frente?


            3.2.1. Sim: provável dispepsia/azia  
            * Oriente evitar café/bebida com gás/alimento gorduroso, condimentado ou ácido e, se sintomas noturnos, elevar cabeceira da cama e evitar comer tarde da noite.  
            * Pare AINEs e discuta sobre parar AAS. Se fuma tabaco (Texto 146). Se bebe álcool ≥ 4 doses/sessão (texto 145). Uma dose é 50mL (um copinho) de destilados, 125mL (uma taça pequena) de vinho ou 330mL (uma lata ou garrafinha) de cerveja.  
            * Avalie e maneje o estresse (Texto 101). Ofereça acupuntura, se disponível.  
            * Se circunferência abdominal > 88cm (mulher) ou 102cm (homem), incentive perda de peso e avalie risco cardiovascular (Texto 128).  
            * Prescreva omeprazol 20mg ao dia por pelo menos 4 semanas. Se baixa resposta, aumente para 40mg ao dia. Considere hidróxido de alumínio 60mg/mL 10mL (2 colheres de chá) 3-6 vezes/dia se necessário. Se sem resposta após 8 semanas, discuta para considerar tratar H Pylori (discuta para decidir se trata mesmo sem EDA/confirmação diagnóstica).  
            * Se ≥ 60 anos, perda de peso inexplicada, dor/dificuldade progressiva de engolir, sangue nas fezes, massa abdominal ou vômitos persistentes/com sangue, em investigação de anemia ou de sangue oculto em fezes, linfadenopatia, pai/mãe/irmão com câncer de esôfago/estômago: solicite EDA e interprete.


            3.2.2. Não:  
            * Avalie estresse e ansiedade (Texto 101).  
            * Se paciente tem uma doença incurável, ofereça também cuidados paliativos (Texto 167).  
            * Discuta se: náuseas/vômitos persistentes > 2 semanas ou diagnóstico incerto.

         `
  },
  {
    titulo: 'Diarreia',
    pagina: 60,
    conteudo: `
         1. Atenda com urgência paciente com diarreia e um ou mais dos seguintes:
         • Sede, boca seca, turgor de pele diminuído, olhos fundos, sonolência/confusão, PAS < 90, FC ≥ 100: provável desidratação.
         
         1.1. Maneje:
         • Dê solução de reidratação oral: goles pequenos (meta: 1-2L em 2h). Se vômito, espere 10 min e tente mais devagar, ou dê metoclopramida 10mg VO/IM/EV ou dimenidrinato 50-100mg VO.
         - Se incapaz de beber ou PAS < 90, aplique cloreto de sódio 0,9% 250mL EV rápido, repita até PAS > 90. Pare se falta de ar ou novas crepitações pulmonares.
         - Se sem melhora após reidratação EV ou 2 horas de reidratação oral, discuta/encaminhe no mesmo dia.
         
         2. Abordagem do paciente com diarreia que não necessita de atenção urgente:
         * Confirme que paciente tem diarreia: fezes liquefeitas e/ou > 3 evacuações ao dia.
         * Oriente paciente aumentar consumo de fluidos e alimentos leves e salgados, comer refeições pequenas e frequentes e a evitar bebidas doces/cafeinadas.
         * Se > 65 anos, restrito ao leito ou em cuidados paliativos, avalie massa fecal imóvel e sólida no reto. Se presente, provável impactação fecal: discuta opções de tratamento/enema.
         * Pergunte sobre a duração da diarreia:
         
         2.1. Diarreia por ≤ 2 semanas:
         * Prescreva solução reidratação oral.
         * Se vômitos, prescreva dimenidrinato 50-100mg ou metoclopramida 10 mg cada 8 horas se necessário por até 5 dias.
         * Temperatura ≥ 38°C e/ou sangue ou muco/pus nas fezes?
         
         2.1.1. Sim: Provável disenteria
         * Trate com ciprofloxacino 500mg cada 12 horas por 3 dias. Se gestante, substitua por azitromicina 500mg ao dia por 3 dias.
         * Se não melhorar após 2 dias adicione metronidazol (evitar álcool até 24 horas após metronidazol via oral) 500mg cada 8 horas por 7 dias.
         * Reavalie em 2 semanas se diarreia persistir.
         
         2.1.2. Não: Provável gastroenterite
         * Se sintomas respiratórios, alteração/perda olfato/paladar, possível COVID (Texto 51).
         * Se disponível, prescreva loperamida 4mg inicialmente, depois 2mg após evacuações, máximo 16mg/dia.
         * Se esteve em área de cólera - diarreia 'água de arroz' (diarreia aquosa turva sem sangue/pus e sem odor fecal, pode ter odor de peixe) em grande volume): dê azitromicina 1g dose única e discuta.
         * Oriente que antibióticos não são necessário, que deve beber bastante líquidos e retornar se piora ou sangue nas fezes.
         * Reavalie em 2 semanas se diarreia persistir
         
         2.2. Diarreia por > 2 semanas
         * Teste para HIV (Texto 116). Se HIV positivo, discuta.
         * Se sangue/muco, discuta.
         * Solicite exame parasitológico de fezes e cultura/antibiograma e, enquanto aguarda resultado/se exame não for viável, considere tratar giardíase: prescreva metronidazol 250mg cada 8 horas por 5-7 dias (evitar álcool até 24 horas após o término da administração de metronidazol via oral). Se não tolerar metronidazol, pare e dê ao invés albendazol 400mg ao dia por 5 dias. Se gestante, não use albendazol.
         * Se realizado, avalie resultado do exame parasitológico de fezes e cultura/antibiograma.
         
         2.2.1. Parasitológico ou cultura positiva: trate de acordo com o resultado.
         
         2.2.2. Parasitológico ou cultura negativa
         * Prescreva metronidazol (evitar álcool até 24 horas após o término da administração de metronidazol via oral) ou albendazol como acima, se não já tiver precrito.
         * Se disponível, prescreva loperamida 4mg inicialmente, depois 2mg após evacuações, máximo 16mg/dia.
         * Se hospitalização/antibioticoterapia recente, considere infecção por Clostridium difficile e discuta.
         * Revise medicamentos que podem causar diarreia (AINEs, omeprazol, metformina, sertralina).
         * Se > 50 anos, faça toque retal para excluir massas/alterações. Discuta, se necessário.
         
         2.2.3. Se diarreia persiste apesar do tratamento:
         * Solicite: HMG, TGO, TGP, GGT, FA, LDH, albumina, cálcio, B12, folato, ferritina, TSH, VHS, PCR, transglutaminase-IgA. Interprete resultados e discuta se necessário.
         * Se perda de peso, sangramento retal, massa retal/abdominal, anemia, VHS/PCR elevados, ≥ 60 anos: solicite colonoscopia e discuta.
         
         3.  Cuidados adicionais para todos os pacientes:
         * Aconselhe aumentar ingestão de líquidos, higiene frequente das mãos com água e sabão, antes de preparar alimentos/após ir banheiro. Lavar todas as superfícies/equipamentos utilizados na preparação de alimentos.Lavar e descascar frutas e vegetais. Usar apenas água segura/desinfetada para preparar alimentos/bebidas/gelo. Cozinha bem alimentos, evitar alimentos crus/não cozidos, especialmente carne e frutos do mar.
         * Se episódios recorrentes de diarreia e sem acesso a água potável, envolva assistência social.
         * Se paciente tem uma doença incurável, ofereça também cuidados paliativos (Texto 167).

         `
  },
  {
    titulo: 'Constipação',
    pagina: 61,
    conteudo: `
      1.           Atenda com urgência paciente com constipação e:
      * Sem fezes ou gases há 24 horas com dor/distensão abdominal e vômito. Neste caso, discuta/encaminhe no mesmo dia.
      
      2.           Abordagem do paciente com constipação que não necessita de atenção urgente:
      
      * Revise dieta, ingestão de líquidos e medicamentos (amitriptilina, codeína, morfina e antipsicóticos podem causar constipação). Pergunte sobre uso regular de enema ou laxativos.
      * Exclua gravidez. Se gestante, oriente que constipação é comum durante gestação. Ofereça cuidados de pré-natal  (Texto 159) e aconselhe como abaixo.
      * Se ganho de peso sem aumento de apetite, desânimo, pele seca, intolerância ao frio: solicite TSH. Se TSH anormal, discuta investigações adicionais e tratamento.
      * Se paciente está acamado ou tem uma doença incurável, considere oferecer também cuidados paliativos (Texto 167).
      * Se paciente > 65 anos, restrito ao leito ou em cuidados paliativos, avalie a presença de massa fecal imóvel e sólida no reto. Se presente, provável impactação fecal: discuta opções de tratamento/enema. Oriente dieta rica em fibras (vegetais, frutas, cereais integrais, farelos e ameixas secas cozidas), ingestão de líquidos e ≥ 30min de exercícios moderados (p. ex. caminhada rápida) na maior parte dos dias.
      * Se não melhorar com dieta e exercícios, dê óleo mineral 15-45mL ao dia ou a cada 8 horas. Evite uso prolongado. Se não melhorar, discuta.
      * Se ≥ 40 anos, verifique necessidade de rastrear câncer colorretal (Texto 21). Se constipação recente inexplicada e sem melhora, perda de peso inexplicada (Texto 32), sangue ou sangue oculto positivo em fezes, anemia, história familiar de câncer colorretal/doença inflamatória intestinal: solicite HMG, TSH, glicose, creatinina, cálcio, rx abdome e colonoscopia. Interprete e discuta.

      `
  },
  {
    titulo: 'Sintomas anais',
    pagina: 61,
    conteudo: `
         
         1. Atenda com urgência paciente com sintomas anais e um ou mais dos seguintes sinais/sintomas:
         * Nódulo extremamente dolorido no ânus
         * Incapaz de defecar devido aos sintomas anais
         Nestes casos, discuta/encaminhe no mesmo dia.
         
         2. Paciente sem necessidade de atendimento de urgência:
         * Pergunte sobre prática sexual anal receptiva desprotegida, dor anal, sangramento, corrimento e coceira/irritação anal. Em seguida examine o ânus e maneje conforme abaixo de acordo com o problema.
         * Se tem prática sexual anal, pergunte também sobre sintomas genitais (Texto 62).
         
         1.1.    Fissura/s
         * Oriente banho de assento com água morna 2-3x/dia.
         * Se constipação, trate como acima.
         * Dê lidocaína 2% gel antes/após evacuar.
         * Se não melhorar, discuta.
         
         1.2.    Nódulo/plicoma: provável hemorroidas
         * Maneje constipação (como acima). Oriente evitar esforço ao evacuar e banho de assento com água morna 2-3x/dia.
         * Dê dexametasona 0,1% pomada cada 12 horas até 7 dias. Se dor, dê lidocaína 2% gel cada 12 horas. Sem melhora, dê ibuprofeno 300-600mg cada 8 horas até 5 dias (Tomar com alimentação. Não prescreva se úlcera péptica, reação alérgica ou exacerbação de asma com uso, doença renal, gestação. Considere associar omeprazol 20mg em jejum se HAS, diabetes, insuficiência cardíaca, ≥ 65 anos, dispepsia, úlcera).
         * péptica prévia, uso de AAS, corticosteroides, varfarina, abuso de álcool..
         * Se sem melhora, irredutível ou trombosada, discuta/ encaminhe.
         
         1.3.    Úlceras ou corrimento
         * Se úlceras (Texto 65).
         * Se corrimento, provável proctite (Considere proctite se prática sexual anal receptiva e dor/desconforto, sangue e/ou corrimento/pus anal/retal ou nas fezes): dê ceftriaxona 500mg IM e azitromicina 1g VO dose única para paciente/parcerias.
         * Se contato com Mpox ou alta prevalência local, considere Mpox e discuta.
         * Se dúvidas ou sem melhora, discuta.
         * Verrugas perianais: Trate como verrugas genitais (Texto 68).
         
         1.4.    Coceira/irritação com pele vermelha/cruenta
         * Oriente boa higiene.
         * Oriente aplicar óleo mineral. Se coceira intensa, prescreva também dexametasona 0,1% pomada a cada 12 horas por 5 dias.
         * Procure causa de contato. Se diarreia (Texto 60).
         * Discuta se não melhorar.
         
         1.5.    Suspeita de vermes
         * Dê albendazol 400mg (Se gestante, discuta opções de tratamento). Repita dose em 14 dias. Trate familiares junto.
         * Eduque higiene pessoal.
         
         `
  },
  {
    titulo: 'Asma e DPOC: diagnóstico',
    pagina: 125,
    conteudo: `
         Asma e DPOC: diagnóstico
         1. Introdução:
            * O paciente com tosse crônica pode ter mais de uma doença. Também considere tuberculose (TB), pneumocistose (PPC), câncer de pulmão, bronquite, insuficiência cardíaca, DRGE e tosse pós-infecciosa (Texto 49).
            * Diagnostique asma/DPOC com base na história, exame físico e resultado de espirometria. Tanto a asma quanto a doença pulmonar obstrutiva crônica (DPOC) apresentam-se com tosse, sibilos, aperto no peito ou falta de ar. Solicite espirometria e diferencie asma de DPOC:
         2. Asma é provável se vários dos seguintes:
            * Início antes dos 20 anos de idade.
            * Associação com rinite alérgica, eczema, conjuntivite alérgica e outras alergias.
            * Sintomas intermitentes com respiração normal entre as crises.
            * Sintomas piores à noite, no início da manhã, com exposição a alérgenos, ao frio ou ao estresse.
            * História pessoal ou familiar (pai/mãe/irmãos) de asma ou doenças atópicas.
            * Espirometria:
               * VEF1/CVF menor que o valor normal para a idade, sexo e estatura.
               * VEF1 aumenta em ≥ 12% e ≥ 200 ml após broncodilatador.
            * Ofereça cuidados de rotina para asma (Texto 126).
         3. DPOC é provável se vários dos seguintes:
            * Início após os 40 anos de idade.
            * Sintomas são persistentes e pioram lentamente ao longo do tempo.
            * Tosse com escarro inicia muito antes da falta de ar.
            * História de tabagismo pesado (≥ 20 cigarros/dia) ou exposição ocupacional (poeira, químicos).
            * Diagnóstico prévio de TB.
            * Diagnóstico prévio de DPOC.
            * Espirometria:
               * VEF1/CVF < 0,7 após broncodilatador.
            * Ofereça cuidados de rotina para DPOC (Texto 127).
         4. Se não tiver certeza do diagnóstico, trate como asma (Texto 126) e discuta ou encaminhe.
         5. Usando inaladores e espaçadores:
            * Se o paciente não é capaz de usar um inalador corretamente, associe um espaçador para aumentar a distribuição do medicamento nos pulmões, especialmente se usa corticoide inalatório. Isso pode prevenir candidíase oral.
            * Limpe o espaçador antes do primeiro uso e cada duas semanas: remova o recipiente do inalador e lave o espaçador com água e sabão. Deixe secar ao ar ambiente. Evite enxaguar com água após cada uso.
         6. Instruções sobre como usar o inalador com espaçador:
            * Passo 1: Agite o inalador e insira no espaçador.
            * Passo 2: Levante-se e expire. Então, feche os lábios em volta do bocal.
            * Passo 3: Pressione o dispositivo uma vez para liberar um jato dentro do espaçador.
            * Passo 4: Faça 4 inspirações mantendo o espaçador na boca. Repita os passos 3 e 4 para cada jato. Enxague a boca após usar corticoide inalatório.
         7. Nota: Se não tiver espaçador disponível, explique como usar o inalador sem espaçador: tire a tampa e agite o inalador. Expire. Feche os lábios em volta do bocal do inalador. Inspire lentamente. Enquanto inspira, aperte o dispositivo uma vez e mantenha a inspiração lenta. Feche a boca e segure a respiração por 10 segundos. Expire. Espere alguns segundos antes de repetir.

      `
  },
  {
    titulo: 'Asma: cuidados de rotina',
    pagina: 126,
    conteudo: `
         1.           Avalie paciente com asma
         
         1.1.              Controle dos sintomas
         * Avaliar em toda consulta
         * Se piora do sibilos/aperto no peito ou da tosse ou da falta de ar, maneje como exacerbação aguda (Texto 50).
         * Se um ou mais dos seguintes no último mês, asma não está controlada:
         - Tosse, falta de ar, aperto no peito ou sibilos ou uso de salbutamol ≥ 3 vezes/semana (Não considerar uso para asma induzida por exercícios).
         - Despertares noturnos devido sintomas de asma
         - Limitação de atividades diárias devido sintomas de asma
         * Se nenhum dos sintomas acima for observado, então a asma está controlada.
         
         1.2.              Outros sintomas
         * Avaliar em toda consulta
         * Maneje sintomas conforme página do sintoma. Pergunte sobre e maneje rinite (Texto 45) e dispepsia/refluxo (Texto 58).
         * Se usa corticoide inalatório e surgimento de manchas brancas na bochecha/gengiva/língua/palato, considere candidíase oral (Texto 46).
         
         1.3.              Adesão/uso do inalador
         * Avaliar em toda consulta
         * Verifique adesão e se usa inalador e espaçador corretamente (Texto 125). Se má adesão, ofereça apoio para aumentar adesão (Texto 16).
         
         1.4.              Depressão
         * Avaliar em toda consulta
         * No último mês, sentiu 1) desanimado, deprimido, sem esperanças ou 2) pouco interesse ou prazer em fazer as coisas? se sim para qualquer um (Texto 147).
         
         1.5.              Espirometria
         * Avaliar no diagnóstico e, posteriormente, conforme o controle da doença.
         * Se asma controlada, não é necessário repetir. Se asma não controlada, avalie cada 6 meses.
         * Compare resultados com valores anteriores. Se reduzidos, verifique adesão e considere ajustar tratamento.
         
         2.           Aconselhe paciente com asma
         * Oriente evitar gatilhos que pioram asma/rinite (ex: animais, poeira, químicos, pólen), AAS, AINEs (ex: ibuprofeno) e beta-bloqueadores (ex: propranolol). Se fuma tabaco (Texto 146). Apoie para mudança (Texto 15).
         * Assegure-se que paciente sabe como reconhecer se asma não está controlada e entende com usar os medicamentos: beta-agonista (salbutamol) alivia sintomas mas não controla asma. Corticoide inalatório (beclometasona) auxilia na prevenção das crises, sendo o principal medicamento de controle da asma.
         * Entregue, por escrito, plano de ação de como usar os medicamentos se piora dos sintomas.
         * Corticoides inalatórios podem causar candidíase oral: oriente paciente enxaguar boca e fazer gargarejos após cada dose.
         
         3.           Trate paciente com asma
         * Prescreva vacina contra influenza anualmente e vacina para COVID-19. Se asma moderada/grave prescreva também vacina pneumocócica 23-v (2 doses em zero e 5 anos).
         * Prescreva salbutamol inalado 200-400mcg (2-4 jatos) se necessário, até 4 vezes ao dia. Se asma induzida por exercícios, prescreva salbutamol 200mcg (2 jatos) 5-10 minutos antes dos exercícios.
         * Se exacerbação aguda nesta consulta:
         - Prescreva prednisona 40mg ao dia num total de 5 dias. Se > 2 ciclos de prednisona em 6 meses ou exacerbações agudas com tratamento intensificado ao máximo, discuta ou encaminhe.
         - Se temperatura axilar ≥ 38°C e escarro amarelo/esverdeado e crepitação pulmonar assimétrica/respiração brônquica, provável pneumonia: se disponível, confirme com RX de tórax e prescreva amoxicilina 500mg cada 8h por 5 dias (Se alergia à penicilina, prescreva ao invés azitromicina 500mg ao dia por 3 dias).
         * Maneje de acordo com o controle da asma:
         
         3.1.              Asma não controlada ou exacerbação aguda: intensifique tratamento
         * Antes de intensificar tratamento verifique se está aderente, sabe usar inalador/espaçador (Texto 125), está evitando fumo e gatilhos de asma (alérgenos, AAS, AINEs, beta-bloqueadores).
         * Prescreva beclometasona inalada 250mcg cada 12 horas (Se usa ritonavir, evite beclometasona e budesonida e discuta alternativas). Se já em uso, aumente para 500mcg cada 12 horas.
         * Se ainda não controlada, pare beclometasona e prescreva formoterol/budesonida 12/400mcg cada 12 horas (Se usa ritonavir, evite beclometasona e budesonida e discuta alternativas). Se já em uso e não controlada após 3 meses, aumente para 24/800mcg cada 12 horas. Se já em uso e ainda não controlada após 3 meses, discuta ou encaminhe.
         * Se asma não controlada ou exacerbação aguda, reavalie pós 1 mês.
         
         3.2.              Asma controlada
         * Continue medicamentos na mesma dose.
         * Se asma controlada e sem exacerbações agudas ≥ 6 meses, reduza pela metade. Se formoterol/budesonida 12/400mcg cada 12 horas, reduza para 6/200mcg. Se já em 6/200mcg pare e dê beclometasona 500mcg cada 12 horas. Ou se usa beclometasona 250mcg cada 12 horas, pare beclometasona (Se usa ritonavir, evite beclometasona e budesonida e discuta alternativas).
         * Se sintomas piorarem enquanto reduz tratamento, reinicie/aumente novamente medicamento para a mesma dose de quando paciente estava com asma controlada.
         * Se asma controlada, reavaliar a cada 6 meses. Oriente retornar antes se não estiver melhor ou piorar.

         `
  },
  {
    titulo: 'Doença pulmonar obstrutiva crônica (DPOC): cuidados de rotina',
    pagina: 127,
    conteudo: `
         Doença pulmonar obstrutiva crônica (DPOC): cuidados de rotina


         1. Avalie paciente com DPOC


         1.1. Avaliar sintomas de DPOC em todas as consultas
         * Se paciente tem sibilos/aperto no peito e está com falta de ar em repouso ou FR > 30, maneje como exacerbação aguda (Texto 50)
         * Avalie gravidade: se paciente pode caminhar tão rápido quanto outros da mesma idade, DPOC é leve. Se não, DPOC é moderada/grave.
         * Investigue TB somente se paciente tem outros sintomas de TB como perda de peso, sudorese noturna, escarro sanguinolento (Texto 110)


         1.2. Avaliar outros sintomas em toda consulta
         * Maneje sintomas conforme página do sintoma.
         * Se usa corticoide inalatório e manchas brancas na bochecha/gengiva/língua/palato, considere candidíase oral (página 46).
         * Se edema em ambas pernas, considere insuficiência cardíaca e cor pulmonale. Solicite ECG, RX de tórax e discuta.


         1.3. Avaliar adesão/uso do inalador em toda consulta
         * Verifique adesão e se usa inalador e espaçador corretamente (Texto 125)
         * Se má adesão, ofereça apoio para aumentar adesão (Texto 16)


         1.4. Avaliar depressão em toda consulta
         * No último mês, sentiu 1) desanimado, deprimido, sem esperanças ou 2) pouco interesse ou prazer em fazer as coisas? se sim para qualquer um, ver texto 147


         1.5. Avaliar cuidados paliativos em toda consulta
         * Se falta de ar em repouso/mínimos esforços, > 3 hospitalizações/ano por DPOC, insuficiência cardíaca ou em uso de O2, ofereça cuidados paliativos (Texto 167)


         1.6. Avaliar risco cardiovascular no diagnóstico, reavaliar posteriormente conforme o risco
         * Avalie o risco cardiovascular (Texto 128). Se < 10% com fator de risco para doença cardiovascular ou 10-20%, reavalie após 1 ano; se > 20%, reavalie após 6 meses.


         1.7. Solicitar Rx de tórax no diagnóstico. Interprete resultado para excluir outras doenças e discuta, se necessário.


         1.8. Solicitar espirometria no diagnóstico e anualmente
         * Avalie gravidade usando VEF1: Se ≥ 80%, DPOC é leve, se ≥ 50% e < 80%, DPOC é moderada, se < 50%, DPOC é grave.
         * Se VEF1/CVF no diagnóstico ≥ 0,7 após broncodilatador ou discrepância entre resultado da espirometria e sintomas: discuta.


         2. Aconselhe paciente com DPOC
         * Se fuma tabaco (Texto 146). Apoie para mudança (Texto 15). Parar de fumar é o principal tratamento para manejo da DPOC.
         * Incentive paciente a fazer caminhadas diárias e aumentar as atividades cotidianas como jardinagem, cuidados com a casa e utilizar escadas em vez de elevadores.
         * Corticoides inalatórios podem causar candidíase oral: oriente paciente enxaguar boca e fazer gargarejos após cada dose.


         3. Trate paciente com DPOC
         * Prescreva vacina contra influenza anualmente e vacina para COVID-19. Prescreva vacina pneumocócica 23-v (2 doses em zero e 5 anos).
         * Prescreva salbutamol inalado 200mcg (2 jatos) se necessário, até 4 vezes ao dia.
         * Antes de ajustar tratamento assegure-se que está aderente e sabe usar inalador/espaçador (Texto 125)
         * Se DPOC moderada/grave ou não controlada com salbutamol, decida qual tratamento adicionar:
            - Se < 2 exacerbações no último ano: adicione formoterol inalado 12mcg, 1 jato cada 12 horas.
            - Se ≥ 2 exacerbações no último ano ou exacerbação com hospitalização no último ano ou sem melhora com formoterol: adicione (ou troque formoterol por) formoterol/budesonida (Se usa ritonavir, evite budesonida e discuta alternativas) 14/400mcg cada 12 horas. Se já em uso e sem melhora, aumente para 24/800mcg cada 12 horas. Se já em uso e ainda sem melhora após 3 meses, solicite espirometria e discuta/encaminhe.
         * Se exacerbação aguda nesta consulta:
            - Se recebeu prednisona ou hidrocortisona, prescreva prednisona 40mg ao dia num total de 5 dias.
            - Se mudança na cor do escarro para amarelo/verde e aumento de volume ou falta de ar, prescreva amoxicilina 500mg cada 8 horas por 5 dias (Se alergia à penicilina, prescreva azitromicina 500mg ao dia por 3 dias). Se DPOC grave, ≥ 2 exacerbações/ano, exacerbação com hospitalização no último ano ou usou antibióticos há < 3 meses, prescreva amoxicilina/clavulanato (500mg/125mg) cada 8 horas por 5 dias (Se alergia à penicilina, discuta alternativas ou prescreva, se disponível, levofloxacina 500 mg ao dia por 5-7 dias. Se VEF1 < 30%, bronquiectasias, uso crônico de corticoide ou usou amoxicilina/clavulanato ou quinolona há < 3 meses, considere prescrever ciprofloxacino 500mg cada 12 horas por 5-7 dias). Se sem melhora após 3 dias, reavalie e discuta.


         4. Se exacerbação recente, ajuste de tratamento, sente-se pior/não tão bem como antes, reavalie mensalmente. Se não, cada 6 meses.

         `
  }
]
