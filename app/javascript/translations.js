I18n.translations || (I18n.translations = {});
I18n.translations["en"] = I18n.extend((I18n.translations["en"] || {}), {"activerecord":{"attributes":{"user":{"email":"Email address","password":"Password"}},"errors":{"messages":{"record_invalid":"Validation failed: %{errors}","restrict_dependent_destroy":{"has_many":"Cannot delete record because dependent %{record} exist","has_one":"Cannot delete record because a dependent %{record} exists"}}}},"clearance":{"models":{"clearance_mailer":{"change_password":"Change your password"}}},"clearance_mailer":{"change_password":{"closing":"If you didn't request this, ignore this email. Your password has not been changed.","link_text":"Change my password","opening":"Someone, hopefully you, requested we send you a link to change your password:"}},"date":{"abbr_day_names":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"abbr_month_names":[null,"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"day_names":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"formats":{"default":"%Y-%m-%d","long":"%B %d, %Y","short":"%b %d"},"month_names":[null,"January","February","March","April","May","June","July","August","September","October","November","December"],"order":["year","month","day"]},"datetime":{"distance_in_words":{"about_x_hours":{"one":"about 1 hour","other":"about %{count} hours"},"about_x_months":{"one":"about 1 month","other":"about %{count} months"},"about_x_years":{"one":"about 1 year","other":"about %{count} years"},"almost_x_years":{"one":"almost 1 year","other":"almost %{count} years"},"half_a_minute":"half a minute","less_than_x_minutes":{"one":"less than a minute","other":"less than %{count} minutes"},"less_than_x_seconds":{"one":"less than 1 second","other":"less than %{count} seconds"},"over_x_years":{"one":"over 1 year","other":"over %{count} years"},"x_days":{"one":"1 day","other":"%{count} days"},"x_minutes":{"one":"1 minute","other":"%{count} minutes"},"x_months":{"one":"1 month","other":"%{count} months"},"x_seconds":{"one":"1 second","other":"%{count} seconds"}},"prompts":{"day":"Day","hour":"Hour","minute":"Minute","month":"Month","second":"Seconds","year":"Year"}},"errors":{"format":"%{attribute} %{message}","messages":{"accepted":"must be accepted","blank":"can't be blank","confirmation":"doesn't match %{attribute}","empty":"can't be empty","equal_to":"must be equal to %{count}","even":"must be even","exclusion":"is reserved","greater_than":"must be greater than %{count}","greater_than_or_equal_to":"must be greater than or equal to %{count}","inclusion":"is not included in the list","invalid":"is invalid","less_than":"must be less than %{count}","less_than_or_equal_to":"must be less than or equal to %{count}","model_invalid":"Validation failed: %{errors}","not_a_number":"is not a number","not_an_integer":"must be an integer","odd":"must be odd","other_than":"must be other than %{count}","present":"must be blank","required":"must exist","taken":"has already been taken","too_long":{"one":"is too long (maximum is 1 character)","other":"is too long (maximum is %{count} characters)"},"too_short":{"one":"is too short (minimum is 1 character)","other":"is too short (minimum is %{count} characters)"},"wrong_length":{"one":"is the wrong length (should be 1 character)","other":"is the wrong length (should be %{count} characters)"}}},"flashes":{"failure_after_create":"Bad email or password.","failure_after_update":"Password can't be blank.","failure_when_forbidden":"Please double check the URL or try submitting the form again.","failure_when_not_signed_in":"Please sign in to continue."},"helpers":{"label":{"password":{"email":"Email address"},"password_reset":{"password":"Choose password"}},"select":{"prompt":"Please select"},"submit":{"create":"Create %{model}","password":{"submit":"Reset password"},"password_reset":{"submit":"Save this password"},"session":{"submit":"Log in"},"submit":"Save %{model}","update":"Update %{model}","user":{"create":"Sign up"}}},"layouts":{"application":{"sign_in":"Log in","sign_out":"Log out"}},"number":{"currency":{"format":{"delimiter":",","format":"%u%n","precision":2,"separator":".","significant":false,"strip_insignificant_zeros":false,"unit":"$"}},"format":{"delimiter":",","precision":3,"separator":".","significant":false,"strip_insignificant_zeros":false},"human":{"decimal_units":{"format":"%n %u","units":{"billion":"Billion","million":"Million","quadrillion":"Quadrillion","thousand":"Thousand","trillion":"Trillion","unit":""}},"format":{"delimiter":"","precision":3,"significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"byte":{"one":"Byte","other":"Bytes"},"eb":"EB","gb":"GB","kb":"KB","mb":"MB","pb":"PB","tb":"TB"}}},"percentage":{"format":{"delimiter":"","format":"%n%"}},"precision":{"format":{"delimiter":""}}},"passwords":{"create":{"description":"You will receive an email within the next few minutes with instructions for changing your password."},"edit":{"description":"Your password has been reset. Choose a new password below.","title":"Change your password"},"new":{"description":"To be emailed a link to reset your password, please enter your email address.","title":"Reset your password"}},"sessions":{"form":{"forgot_password":"Password","sign_up":"Sign up"},"new":{"title":"Log in"}},"stringex":{"characters":{"and":"and","at":"at","degrees":"degrees","divide":"divided by","dot":"\\1 dot \\2","ellipsis":"dot dot dot","equals":"equals","number":"number","percent":"percent","plus":"plus","slash":"slash","star":"star"},"currencies":{"dollars":"\\1 dollars","dollars_cents":"\\1 dollars \\2 cents","euros":"\\1 euros","euros_cents":"\\1 euros \\2 cents","generic":"\\1 pounds","pounds":"\\1 pounds","pounds_pence":"\\1 pounds \\2 pence","reais":"\\1 reais","reais_cents":"\\1 reais \\2 cents","yen":"\\1 yen"},"html_entities":{"amp":"and","cent":" cents","copy":"(c)","deg":" degrees ","divide":" divided by ","double_quote":"\"","ellipsis":"...","em_dash":"--","en_dash":"-","frac12":"half","frac14":"one fourth","frac34":"three fourths","gt":"\u003e","lt":"\u003c","nbsp":" ","pound":" pounds ","reg":"(r)","single_quote":"'","times":"x","trade":"(tm)","yen":" yen "},"vulgar_fractions":{"five_eighths":"five eighths","five_sixths":"five sixths","four_fifths":"four fifths","half":"half","one_eighth":"one eighth","one_fifth":"one fifth","one_fourth":"one fourth","one_sixth":"one sixth","one_third":"one third","seven_eighths":"seven eighths","three_eighths":"three eighths","three_fifths":"three fifths","three_fourths":"three fourths","two_fifths":"two fifths","two_thirds":"two thirds"}},"support":{"array":{"last_word_connector":", and ","two_words_connector":" and ","words_connector":", "}},"time":{"am":"am","formats":{"default":"%a, %d %b %Y %H:%M:%S %z","long":"%B %d, %Y %H:%M","short":"%d %b %H:%M"},"pm":"pm"},"users":{"new":{"sign_in":"Log in","title":"Sign up"}}});
