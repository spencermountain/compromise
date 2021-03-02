require 'chronic' 
# gem install chronic

puts Chronic.parse('next wednesday')
# puts Chronic.parse('next wednesday', :now => Time.local(2021, 2, 1))
# puts Chronic.parse('next wednesday', :now => Time.local(2021, 2, 2))
# puts Chronic.parse('next wednesday', :now => Time.local(2021, 2, 3))
# puts Chronic.parse('next wednesday', :now => Time.local(2021, 2, 4))
# puts Chronic.parse('next wednesday', :now => Time.local(2021, 2, 5))
# puts Chronic.parse('next wednesday', :now => Time.local(2021, 2, 6))
# puts Chronic.parse('next wednesday', :now => Time.local(2021, 2, 7))
  #=> Mon Aug 28 12:00:00 PDT 2006