<template>
	<div>
		<div class="zc_title">
			<img :src="lefturl" alt @click="zc_fan()" />
			<span>注册</span>
		</div>
		<!-- 手机号 -->
		<van-field v-model="tel" type="number" placeholder="请输入手机号" maxlength="11" />
		<!-- 验证码 -->
		<van-field v-model="sms" center clearable placeholder="请输入短信验证码" type="number">
			<template #button>
				<van-button size="small" type="primary" @click="zc_verify" v-show="show">获取验证码</van-button>
				<van-button size="small" type="primary" class="count" v-show="!show">{{ count }}</van-button>
			</template>
		</van-field>
		<!-- 输入密码 -->
		<van-field v-model="password" type="password" placeholder="密码  |  8-12位数字字母结合" maxlength="12" />
		<!-- 再次确认密码 -->
		<van-field
		  v-model="password1"
		  type="password"
		  placeholder="再次确认密码"
		  class="zc_again"
		  maxlength="12"
		/>
		<!-- 邀请码 -->
		<van-field v-model="yaoqing" placeholder="请输入	邀请码" />
		<!-- 昵称 -->
		<van-field v-model="waihao" placeholder="昵称  |  汉字字母数字_-" @blur="nicheng(waihao)" @focus="xiaoming"/>
		<!-- 籍贯-->
		<van-field
		  v-model="jiguan_ssq"
		  label="籍贯"
		  placeholder="请选择籍贯"
		  @click="jiguan = true"/>
		<van-popup v-model="jiguan" position="bottom">
		  <van-area
		  :area-list="areaList"
		  :columns-placeholder="['请选择', '请选择', '请选择']"
		  @cancel="jiguan = false"
		  @confirm="jiguantijiao"
		  />
		</van-popup>
		<!-- 身份选择 -->
		<van-field
		  readonly
		  clickable
		  name="picker"
		  :value="value"
		  label="身份"
		  placeholder="点击选择身份"
		  @click="showPicker = true"
		/>
		<van-popup v-model="showPicker" position="bottom">
		  <van-picker
			show-toolbar
			:columns="columns"
			@confirm="onConfirm"
			@cancel="showPicker = false"
		  />
		</van-popup>
		<!-- 提交按钮 -->
		<div style="margin: 16px;">
		  <van-button round block type="info" native-type="submit" @click="zc_tijiao">立即注册</van-button>
		</div>
		<div class="a123">
			<div class="zc_xieyi">
				<van-checkbox
				  v-model="checked"
				  icon-size="16px"
				  checked-color="#07c160"
				  style="font-size: 0.3rem;"
				>
				注册即表示同意
				<span style="color:red" @click="zhuce">注册协议</span>
				</van-checkbox>
			</div>
		</div>
		<van-popup
		  v-model="zcxieyi"
		  closeable
		  close-icon="clear"
		  class="zcxy"
		>
		<div id="container">
			<span style="font-size: 24px"><b>用户协议</b></span>
			<br>
			<br>
			<span>版本号：试用版V1.0版本(2020)</span>
			<br>
			<span>此版本生效日期：2020年 5 月 5 日</span>
			<br>
			<p>
				欢迎您使用<span>汀沐抢装</span>产品（以下简称“我们”或“本平台”）。本平台是一个严肃纯净的装修服务平台，用户（以下称“您”或“用户”）在此注册为用户并在之后进行的项目中应遵守以下用户协议条款：
			</p>
			<p>
				一、《用户协议》条款的接受&nbsp;
				<br>
				<u><b>请您认真阅读本协议，尤其是免除或者限制本平台责任的条款及其它限制您权利的条款，一旦您注册即表示您已经阅读并且同意与本平台达成协议，完全理解并接受所有的《用户协议》条款。阅读本协议过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。</b></u>
			</p>
			<p>
				二、用户注册条件&nbsp;
				<br> 1、用户申请注册成为本平台的用户应同时满足下列全部条件：&nbsp;
				<br>在注册之日以及此后使用本平台服务期间必须以装修或配合装修施工为目的；&nbsp;
				<br>在注册之日必须年满18周岁以上。&nbsp;
				<br>2、为更好的享有本平台提供的服务，用户应：&nbsp;&nbsp;
				<br>向本平台提供本人真实、正确、最新及完整的资料；随时更新登记资料，保持其真实性及有效性；提供真实有效的联系人手机号码；使用过程中，务必保持账号的唯一性。&nbsp;
				<br>3、若用户提供任何错误、不实或不完整的资料，或本平台有理由怀疑资料为错误、不实或不完整及违反本协议条款的，或本平台有理由怀疑用户的用户资料、言行等有悖于“真实性、合法性、正规性”主题的，本平台有权修改该用户的注册昵称等，或暂停或终止该用户的账号，或暂停或终止提供本平台的全部或部分服务。&nbsp;
				<br>4、为保证用户信息的真实性，未经过会员认证的用户试用本产品功能，对期间造成的个人损失或其它损失自己承担责任。
			</p>
			<p>
				三、用户账号名称安全&nbsp;
				<br>任何注册和使用的本平台账号名称，不得有下列情形：&nbsp;
				<br>（一）违反宪法或法律法规规定的；&nbsp;
				<br>（二）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；&nbsp;
				<br>（三）损害国家荣誉和利益的，损害公共利益的；&nbsp;
				<br>（四）煽动民族仇恨、民族歧视，破坏民族团结的；&nbsp;
				<br>（五）破坏国家宗教政策，宣扬邪教和封建迷信的；&nbsp;
				<br>（六）散布谣言，扰乱社会秩序，破坏社会稳定的；&nbsp;
				<br>（七）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；&nbsp;
				<br>（八）侮辱或者诽谤他人，侵害他人合法权益的；&nbsp;
				<br>（九）含有法律、行政法规禁止的其他内容的。&nbsp;
				<br>用户以虚假信息骗取账号名称注册，或其账号头像、简介等注册信息存在违法和不良信息的，本平台有权采取通知限期改正、暂停使用、注销账号等措施。&nbsp;
				<br>对冒用关联机构或社会名人注册账号名称的用户，本平台有权注销其账号。用户应采取适当措施保障注册用户名和密码的机密性并对以该用户名和密码进行的所有活动承担全部责任。用户应确保严格保密自己的账号信息，若发现未经授权使用该用户名或密码或其他侵犯其账户安全的任何行为立即通知本平台；本平台对未遵守上述规定而给用户或他人带来的任何损失不承担责任。
			</p>
			<p>
				四、服务说明&nbsp;
				<br>1、<b>本平台在提供网络服务时，可能会对部分网络服务收取一定的费用，在此情况下，会在相关页面上做明确的提示。</b>如您拒绝支付该等费用，则不能使用相关的网络服务。您在本平台购买相关服务可选择使用您的第三方电子账户（包括但不限于微信支付账户或支付宝支付账户）进行支付，在处理您使用服务相关的付款时，除了受本协议及相关协议的约束，还要受电子支付服务商及信用卡/借记卡发卡行的条款和政策的约束，我们对于电子支付服务商或银行发生的错误不承担责任。付费业务将在本协议条款的基础上另行规定服务条款，以规范付费业务的内容和双方的权利义务，用户应认真阅读，如您购买付费业务，则视为接受付费业务的服务条款。&nbsp;
				<br>2、无论是付费业务还是本平台免费提供服务，上述服务均有有效期，有效期结束后服务将自动终止，且有效期不可中断或延期。除非本协议条款另有规定，否则所有付费业务均不退费。&nbsp;
				<br>3、对于利用本平台服务进行非法活动，或其言行（无论线上或者线下的）背离本平台严肃交友目的的，本平台将严肃处理，包括将其列入平台黑名单、删除用户账号等处罚措施，涉嫌刑事犯罪的，本平台有权向司法机关进行投诉、举报。&nbsp;
				<br>4、本平台有权向您发送广告信或代其他用户向您发送消息，或为组织线下活动等目的，向您发送电子邮件、短信或电话通知。由于手机网络的特殊性，本平台有权获取您的手机信息，如手机号码或用户的基站位置等。&nbsp;
				<br>5、为提高本平台用户的成功率和效率，本平台在获取用户的授权后有权将本平台用户的信息在本平台的合作网站上进行展示或其他类似行为。&nbsp;
				<br>6、为了保障本平台用户账户安全，如用户连续180日内未登录注册账户（用户购买有明确期限付费服务的有效期未满除外），则自第180天当天的24时起，本平台有权对该账户进行冻结。用户重新启用账户应致电公司客服（<span class="tel_query">暂未开通</span>），并通过相关验证。&nbsp;
				<br>7、用户不得将本平台及在本平台上的行为用作商业用途。除非经本平台书面授权，不得与任何商业行为相关联。任何非法和/或未经授权而使用本平台的行为（包括但不限于通过电子或其他方法），本平台有权采取封号及其他措施保护自身权益。&nbsp;
				<br>8、用户可通过充值在本平台内购买服务、获得更多展示资格等其他增值服务。充值的使用范围仅限于兑换本平台提供的产品和服务，不得用于支付、购买实物或兑换其他单位的产品和服务。
			</p>
			<p>
			   <b>
				   五、用户个人信息保护
				   <br>1、本平台非常重视您的个人信息保护，保证在合法、正当与必要的原则下收集、使用或者公开您的个人信息且不会收集与提供和本产品服务无关的个人信息。
				   <br>2、您在注册账号或使用本服务的过程中，为了更好地向您提供相关服务，本平台可能需要您填写或提交一些必要的基础个人信息，如法律法规、规章规范性文件（以下称“法律法规”）规定的需要填写的身份信息。如您提交的信息不完整或不符合法律法规的规定，则您可能无法使用本服务或在使用本服务的过程中受到限制。
				   <br>3、本平台收集的用户个人信息包括：1）用户在注册时需自行提供的必要个人信息（如注册时填写的手机号码、性别、年龄等个人信息）；2）本平台在提供服务过程中合法收集的用户个人信息，如用户使用服务时的设备信息、账号信息、日志信息、个人基本资料等。请注意，单独的设备信息、日志信息等是无法识别特定自然人身份的信息；3）地理位置信息：因本平台提供的服务系基于地理位置提供的移动社交服务，用户地理位置信息将作为用户公开资料之一，由本平台向其他用户公开以便本平台向用户提供基于地理位置的移动社交服务。在收集用户的地理位置信息前，本平台将单独向您发出权限开放申请，如您不愿意提供地理位置信息，可选择拒绝。您在提供地理位置信息后，也可随时通过您的设备系统设置终止向其他用户公开您的地理位置信息。
				   <br>4、本平台承诺，本平台收集您的个人信息将仅用于以下用途：
				   <br>（1）创建本平台账号，帮助您成为本平台注册用户；
				   <br>（2）为您提供和展示推送本平台的商品或服务；
				   <br>（3）为您提供安全保障；
				   <br>（4）本平台向用户及时发送重要通知，如软件更新、本协议条款的变更；
				   <br>（5）本平台内部进行审计、数据分析和研究等，以改进本平台的产品、服务和与用户之间的沟通；
				   <br>（6）依本协议约定，本平台提供相关服务、管理、审查用户信息及进行处理措施；
				   <br>（7）适用法律法规规定的其他事项。
				   <br> 除上述事项外，如未取得用户事先同意，本平台不会将用户个人信息使用于任何其他用途。如果本平台将您的个人信息用于任何未载明的其他用途，或者将基于特定目的收集而来的信息用于其他目的时，会事先征求您的同意。
				   <br>5、本平台未经用户同意不会向任何第三方共享、转让、公开披露用户个人隐私信息。但以下特定情形中，共享、转让、公开披露您的个人信息无需事先征得您的授权同意：
				   <br>（1）与国家安全、国防安全有关的；
				   <br>（2）与公共安全、公共卫生、重大公共利益有关的；
				   <br>（3）与犯罪侦查、起诉、审判和判决执行等有关的；
				   <br>（4）出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；
				   <br>（5）您自行向社会公众公开的个人信息；
				   <br>（6）从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。
				   <br>6、尊重个人信息的私有性是本平台的一贯制度，本平台将采取技术措施和其他必要措施，确保用户个人信息安全，防止在本服务中收集的用户个人信息泄露、毁损或丢失。在发生前述情形或者本平台发现存在发生前述情形的可能时，本平台将及时采取补救措施并告知用户，用户如发现存在前述情形亦需立即与本平台联系。
				   <br>7、本平台重视对未成年人的保护。本平台将依赖用户提供的个人信息判断用户是否为未成年人。任何18岁以下的未成年人均不得注册账号或使用本服务。
			   </b>
			</p>
			<p>
				六、免责及责任限制条款&nbsp;&nbsp;
				<br>1、本平台将尽所能地保证所提供网络服务的连续性和稳定性，但用户应理解，由于网络空间的特殊性，本平台无法百分之百保证服务不会中断，对服务的及时性、安全性、准确性也无法作出绝对的保证。如果系统发生故障、进行维护或维修或其他超出我们控制的原因，导致对本平台的访问暂时中止或错误，本平台可能无法事先通知，用户同意在此情况下对造成的任何损失（如有）免除本平台的任何责任。&nbsp;
				<br>2、对于您通过本平台提供的服务传送的内容，本平台会尽合理努力按照国家有关规定严格审查，但无法完全控制经由网站服务传送的内容，不保证内容的正确性、完整性或品质。因此用户在使用本平台服务时，可能会接触到令人不快、不适当或令人厌恶的内容。本平台有权依法停止传输任何前述内容并采取相应行动，包括但不限于暂停用户使用网站服务的全部或部分，保存有关记录，并根据国家法律法规、相关政策在必要时向有关机关报告并配合有关机关的行动。
				<br>3、对于本平台提供的各种广告信息、链接、资讯等，本平台会对广告内容进行初步审核，但是本平台难以百分之百确保对方产品真实性、合法性或可靠性，对于用户经由本平台服务与广告主进行联系或商业往来，属于用户和广告主之间的行为，与本平台无关。用户应理性看待广告，如需购买或者交易，请谨慎考虑。
				<br>4、对于用户上传的照片、资料、证件等，本平台已采用相关措施并已尽合理努力进行审核，但无法完全保证其内容的正确性、合法性或可靠性，相关责任由上传上述内容的用户负责，本平台不承担任何责任。&nbsp;
				<br>5、您应以自己的独立判断从事与交友相关的行为，并独立承担可能产生的不利后果和责任，本平台不承担任何法律责任。&nbsp;
				<br>6、本平台作为装修服务平台，帮助用户寻找心仪服务和服务目标是我们的服务内容，但是本平台不保证所提供的服务一定能满足您的要求和期望。您应理解，由于装修服务具有其特殊性，成功与否受个人主观因素影响较大，本平台仅为用户提供一个沟通交流的空间，无法确保每个用户的交友目的都能实现。
				<br>7、为了尽可能满足您的需求，本平台推出的服务，全都是在用户同意并主动授权的情况下帮助授权用户寻找功能性服务。本平台不能保证用户通过此类服务授权由系统自动发出或接收到的信息完全满足用户需求。&nbsp;
				<br>8、本平台对于用户在使用本平台过程中因任何第三方原因导致的任何金钱或其他损失或损害不承担任何责任（该等损失或损害包括但不限于，任何直接的、间接的、惩罚性的或必然的损失或伤害，或任何收入、利润、信誉、数据、合同、资金使用上的任何损失，无论是民事侵权行为、合同还是其他）。&nbsp;
				<br>9、用户因任何其他第三方（包括但不限于自然人）使用本平台引起的行为，向第三方要求索赔或进行诉讼，用户同意独自进行该类索赔或诉讼，而且同意豁免本平台承担由该索赔或诉讼引起的任何相关联的所有索赔、责任和损失。&nbsp;
				<br>10、您理解并同意本平台仅仅是为您和其他用户的交互提供平台，但对用户间的来往（无论是在网上或在现实生活中），用户须对自己的行为承担全部责任。如您与其他用户产生争议，则理解并同意本平台并没有义务监控或处理用户之间的争议。
			</p>
			<p>
				七、用户应遵守以下法律法规：&nbsp;
				<br>1、本平台提醒用户在使用本平台服务时，遵守《中华人民共和国合同法》、《中华人民共和国著作权法》、《全国人民代表大会常务委员会关于维护互联网安全的决定》、《中华人民共和国保守国家秘密法》、《中华人民共和国电信条例》、《中华人民共和国计算机信息系统安全保护条例》、《中华人民共和国计算机信息网络国际联网管理暂行规定》及其实施办法、《计算机信息系统国际联网保密管理规定》、《互联网信息服务管理办法》、《计算机信息网络国际联网安全保护管理办法》、《互联网电子公告服务管理规定》、《互联网用户账号名称管理规定》等相关中国法律法规的规定。&nbsp;
				<br>2、在任何情况下，如果本平台有理由认为用户使用本平台服务过程中的任何行为，包括但不限于用户的任何言论和其它行为违反或可能违反上述法律和法规的任何规定，本平台可在任何时候不经任何事先通知终止向该用户提供服务。
			</p>
			<p>
				八、禁止用户从事下列行为:&nbsp;
				<br>1、发布信息或者利用本平台的服务时在本平台的网页上或者利用本平台的服务制作、复制、发布、传播以下信息：反对宪法所确定的基本原则的；危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；损害国家荣誉和利益的；煽动民族仇恨、民族歧视、破坏民族团结的；破坏国家宗教政策，宣扬邪教和封建迷信的；散布谣言，扰乱社会秩序，破坏社会稳定的；散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；侮辱或者诽谤他人，侵害他人合法权利的；含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它有悖道德、令人反感的内容；含有中国法律、法规、规章、条例以及任何具有法律效力的规范所限制或禁止的其它内容的。&nbsp;
				<br>2、使用本平台服务的过程中，以任何方式危害未成年人的利益的。&nbsp;
				<br>3、冒充任何人或机构，包含但不限于冒充本平台工作人员、政府人员等，或以虚伪不实的方式陈述或谎称与任何人或机构有关的。&nbsp;
				<br>4、将侵犯任何人的肖像权、名誉权、隐私权、专利权、商标权、著作权、商业秘密或其它专属权利的内容上载、张贴、发送电子邮件或以其它方式传送的。&nbsp;
				<br>5、将病毒或其它计算机代码、档案和程序，加以上载、张贴、发送电子邮件或以其它方式传送的。&nbsp;
				<br>6、跟踪或以其它方式骚扰其他用户的。&nbsp;
				<br>7、未经合法授权而截获、篡改、收集、储存或删除他人个人信息、电子邮件或其它数据资料，或将获知的此类资料用于任何非法或不正当目的。&nbsp;
				<br>8、以任何方式干扰本平台服务的。
			</p>
			<p>
				九、关于用户在本平台上传或张贴的内容&nbsp;
				<br>1、用户在本平台上传或张贴的内容（包括照片、文字、交友成功用户的成功故事等），视为用户授予本平台免费、非独家的使用权，本平台有权为展示、传播及推广前述张贴内容的目的，对上述内容进行复制、修改、出版等。该使用权持续至用户书面通知本平台不得继续使用，且本平台实际收到该等书面通知时止。本平台合作伙伴使用或在现场活动中使用，本平台将事先征得用户的同意，但在本平台内使用不受此限。&nbsp;
				<br>2、因用户进行上述上传或张贴，而导致任何第三方提出侵权或索赔要求的，用户承担全部责任。&nbsp;
				<br>3、任何第三方对于用户在本平台的公开使用区域张贴的内容进行复制、修改、编辑、传播等行为的，该行为产生的法律后果和责任均由行为人承担，与本平台无关。
			</p>
			<p>
				十、本协议条款的变更和修改&nbsp;
				<br>本平台有权随时对本用户协议条款进行变更和修改。一旦发生注册条款的变动，本平台将在页面上提示修改的内容，或将最新版本的用户协议以邮件的形式发送给用户。您如果不同意用户协议的修改，可以主动取消用户资格（如注销账号），如对部分服务支付了额外的费用，可以申请将费用全额或部分退回。如果您继续使用用户账号，则视为您已经接受用户协议的修改。
			</p>
			<p>
				十一、本平台对所有网站及相关软件有唯一的升级修改权限，并有权终止一部分版本的使用。本平台变更、中断或终止服务，将尽所能在变更、中断或终止之前通知用户，并向受影响的用户提供等值的替代性的服务；如用户不愿意接受替代性的服务，如果该用户在本平台尚有账户余额或未消耗完的服务，本平台将按照该用户实际使用服务的情况予以结算。
			</p>
			<p>
				十二、法律适用与争议管辖
				<br>1、本协议之订立、生效、解释、修订、补充、终止、执行与争议解决均适用于中华人民共和国大陆地区法律。
				<br><b>2、用户与本平台就本协议内容或其执行发生任何争议，应进行友好协商；协商不成时，任何一方均可向被告经营地有管辖权的人民法院提起诉讼。</b>
			</p>
		</div>
		</van-popup>
  </div>
</template>

<script>
import ditushuju from '../assets/area.js'
import store from '../../store/index.js'

export default {
	name: "zhuce_my",
	data() {
		return {
			lefturl:require('../assets/my/left.png'),
			tel: "",
			password: "",
			password1: "",
			jiguan_ssq: "",
			yaoqing: "",
			jiguan:false,
			areaList:ditushuju,
			value: "",
			label: "",
			columns: ["业主", "风水师", "设计师", "监理", "供应商", "电工", "木工", "泥工"],
			// columns:[],
			showPicker: false,
			sms: "",
			show: true,
			count: "",
			timer: null,
			verify_id: "",
			waihao: "",
			checked: false,
			zcxieyi: false
		};
	},
	methods: {
		zhuce(){
			// this.$router.push({ name: "xieyi" });
			this.zcxieyi = true
		},
		zc_fan() {
			this.$router.go(-1);
		},
		onConfirm(value) {
			this.value = value;
			this.showPicker = false;
		},
		zc_verify() {
			if (this.tel == "") {
				this.show = true;
				clearInterval(this.timer);
				this.timer = null;
				this.$toast("手机号不能为空");
			} else if (!/^(0|86|17951)?(13[0-9]|15[012356789]|16[6]|19[89]]|17[01345678]|18[0-9]|14[579])[0-9]{8}$/.test(this.tel)) {
				this.show = true;
				clearInterval(this.timer);
				this.timer = null;
				this.$toast("请正确填写手机号");
			} else {
				var Toast = this.$toast;
				var that = this;
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000);
				}
				this.$axios.post("https://test.sazjob.com/customapi/User/sendSms", {
					mobile: this.tel
				}).then(function(response) {
					console.log(response)
					console.log(response.data)
					that.verify_id = response.data.key;
					console.log(that.verify_id);
					if (response.data.status == 200) {
						Toast.success("验证码发送成功，请注意查收");
					} else if (response.data.status == 201) {
						Toast("手机号格式错误");
					} else if (response.data.status == 102) {
						Toast("手机号格式错误");
					} else {
						Toast.fail("网络不佳请稍后重试");
					}
				}).catch(function(error) {
					console.log(error);
				});
			}
		},
		nicheng(n) {
			var that = this;
			this.$axios.post('https://test.sazjob.com/customapi/UserCheck/checknickname',{
				'nickname' : n
			}).then(_d => {
				console.log(_d.data);
				console.log(_d.data.status);
				console.log(_d.data.msg);
				if(_d.data.status === 200){
					that.waihao = that.waihao
				}else{
					that.waihao = _d.data.msg
				}
			})
		},
		xiaoming(){
			var that = this;
			if(that.waihao === '昵称非法数据' || that.waihao === '昵称重复' || that.waihao === "操作失败"){
				this.$toast({
				  message: that.waihao,
				  icon: "chat-o"
				});
				that.waihao =  '';
			}
		},
		jiguantijiao(val) {
			let sheng = val[0].name
			let shi = val[1].name
			let qu = val[2].name
			this.jiguan_ssq = sheng+"-"+shi+"-"+qu
			this.jiguan = false
		},
		zc_tijiao() {
			if (this.tel == "") {
				this.$toast({
					message: "手机号不能为空",
					icon: "chat-o"
				});
			} else if (!/^1[3456789]\d{9}$/.test(this.tel)) {
				this.$toast({
					message: "请正确填写手机号",
					icon: "chat-o"
				});
			} 
	  // else if (this.sms == "") {
   //      // this.$toast('请输入验证码');
   //      this.$toast({
   //        message: "请输入验证码",
   //        icon: "chat-o"
   //      });
   //    } 
			else if (this.password == "") {
				// this.$toast('请输入密码');
				this.$toast({
					message: "请输入密码",
					icon: "chat-o"
				});
			}
			else if (!/(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,12}/.test(this.password)) {
				// this.$toast('请按照要求输入密码');
				this.$toast({
					message: "请按照要求输入密码",
					icon: "chat-o"
				});
			} else if (this.password1 == "") {
				// this.$toast('请再次确认密码');
				this.$toast({
					message: "请再次确认密码",
					icon: "chat-o"
				});
			} else if (this.password !== this.password1) {
				// this.$toast('请两次输入的密码不一致');
				this.$toast({
					message: "请两次输入的密码不一致",
					icon: "chat-o"
				});
			} else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(this.waihao)) {
				this.$toast({
					message: "请按照要求昵称",
					icon: "chat-o"
				});
			} else if(this.jiguan_ssq == "") {
				this.$toast({
					message: "请选择籍贯",
					icon: "chat-o"
				});
			}
			else if (this.value == "") {
				// this.$toast('请选择身份');
				this.$toast({
				  message: "请选择身份",
				  icon: "chat-o"
				});
			} else if (this.checked == false) {
				// this.$toast('请查看协议并勾选');
				this.$toast({
				  message: "请查看协议并勾选",
				  icon: "chat-o"
				});
			} else {
				console.log(this.verify_id);
				var Toast = this.$toast;
				var that = this;
				// var aaa = that.$router.push
				if (this.value == "业主") {
				  this.label = 3;
				} else if (this.value == "风水师") {
				  this.label = 1;
				} else if (this.value == "设计师") {
				  this.label = 2;
				} else if (this.value == "监理") {
				  this.label = 4;
				} else if (this.value == "供应商") {
				  this.label = 5;
				} else if (this.value == "木工") {
				  this.label = 6;
				} else if (this.value == "电工") {
				  this.label = 7;
				} else if (this.value == "泥工") {
				  this.label = 8;
				} 	
				var promise = new Promise((resolve,reject)=>{
					this.$axios.post("https://test.sazjob.com/customapi/User/register", {
						mobile: this.tel,
						verify_id: this.verify_id,
						verify: this.sms,
						phone: this.tel,
						password: this.password,
						userclass_id: this.label,
						nickname: this.waihao,
						province:this.jiguan_ssq.split("-")[0],
						city:this.jiguan_ssq.split("-")[1],
						converge:this.jiguan_ssq.split("-")[2],
						yqcode:this.yaoqing
					  }).then(function(response) {
						console.log(response);
						resolve(response);
						// console.log(response.data.status)
						if (response.data.status == 200 ||response.data.status == 110) {
						  Toast.success("注册成功");
						} else if (response.data.status == 201) {
						  Toast.fail("验证码输入错误");
						} else if (response.data.status == 11) {
						  Toast.fail("您所输入的电话号码已被注册，请更换手机号");
						} else if (response.data.status == 120) {
						  Toast.fail("验证码输入错误");
						} else if (response.data.status == 10) {
						  Toast.fail("操作次数过多，请稍后尝试");
						} else {
						  Toast.fail("网络不佳，请稍后重试");
						}
					  }).catch(function(error) {
						console.log(error);
					});
				})
				promise.then((response)=>{
					if(typeof (api) == 'undefined'){
						this.$axios.post("https://test.sazjob.com/customapi/User/login", {
							phone: this.tel,
							password: this.password
						}).then(_d => {
							console.log(_d);
							if(typeof save_user === "function"){
								save_user(_d);
								that.$router.push({ name: "Index" });
							}else{
								store.commit("userid", _d.data.data.userclass_id);
								store.commit("set_token", _d.data.token);
								store.commit("nicheng",_d.data.data.nickname);
								that.$router.push({ name: "Index" });
							}
						})
					}else{
						api.ajax({
							url: 'https://test.sazjob.com/customapi/User/login',
							method: 'post',
							data: {
								values:{phone: this.tel,password: this.password}
							}
						},function(response,err){
							if (response) {
								if(response.status === "200"){
									Toast.success("登录成功");
									save_user(response);
									that.$router.push({ name: "Index" });
								} else if (response.status === "201") {
									Toast.fail("账号或密码输入有误");
								} else if (response.status === "120") {
									Toast.fail("账号或密码输入有误");
								} else if (response.status === "10") {
									Toast.fail("操作次数过多，请稍后尝试");
								} else {
									Toast.fail("网络不佳，请稍后重试");
								}
							} else {
								alert(err);
							};
						});
					}
				})
			}
		}
	}
};
</script>
<style scoped>
.zc_title {
  background-color: #fafafa;
  padding: 0px 16px;
  height: 1.4rem;
  line-height: 1.4rem;
}
.zhBtn {
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 0.5rem;
  background: #6678ff;
  height: 1.2rem;
  border-radius: 0.1rem;
  line-height: 1.2rem;
  text-align: center;
  color: #ffffff;
  font-size: 0.4rem;
}
.zc_title img {
  width: 0.4rem;
  height: 0.4rem;
  margin: 0.03rem 0.25rem 0.2rem 0rem;
}
.zc_title span {
  font-size: 0.5rem;
  height: 1.4rem;
  line-height: 1.4rem;
}
.zc_xieyi {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -0%);
}
.a123 {
  position: relative;
}
.zcxy{
	width: 80%;
    height: 80%;
    padding: 0.3rem;
    background-color: rgba(255, 255, 255, 0.7);
}
.zcxy :nth-child(2){
	color: #000000
}
</style>
