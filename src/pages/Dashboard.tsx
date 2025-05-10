import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, Star, TrendingUp, Calendar, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'کل کارمندان',
      value: '150',
      icon: <Users className="w-6 h-6 text-blue-500" />,
      change: '+12%',
      color: 'bg-blue-50',
    },
    {
      title: 'شرکت‌های فعال',
      value: '45',
      icon: <Briefcase className="w-6 h-6 text-green-500" />,
      change: '+5%',
      color: 'bg-green-50',
    },
    {
      title: 'ارزیابی‌های انجام شده',
      value: '280',
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      change: '+8%',
      color: 'bg-yellow-50',
    },
    {
      title: 'نرخ رشد',
      value: '24%',
      icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
      change: '+3%',
      color: 'bg-purple-50',
    },
  ];

  const recentActivities = [
    {
      title: 'ارزیابی جدید',
      description: 'ارزیابی عملکرد تیم توسعه انجام شد',
      time: '2 ساعت پیش',
      icon: <Star className="w-5 h-5 text-yellow-500" />,
    },
    {
      title: 'کارمند جدید',
      description: 'علی محمدی به تیم اضافه شد',
      time: '3 ساعت پیش',
      icon: <Users className="w-5 h-5 text-blue-500" />,
    },
    {
      title: 'شرکت جدید',
      description: 'شرکت فناوری نوین ثبت شد',
      time: '5 ساعت پیش',
      icon: <Briefcase className="w-5 h-5 text-green-500" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">داشبورد</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/evaluations/new')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            ارزیابی جدید
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
              <span className="text-sm text-gray-500 mr-2">از ماه گذشته</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">فعالیت‌های اخیر</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex-shrink-0">{activity.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.description}</p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 ml-1" />
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">ارزیابی‌های پیش رو</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-500 ml-2" />
                <span className="text-sm text-gray-600">ارزیابی تیم فروش</span>
              </div>
              <span className="text-sm text-gray-500">2 روز دیگر</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-500 ml-2" />
                <span className="text-sm text-gray-600">ارزیابی تیم پشتیبانی</span>
              </div>
              <span className="text-sm text-gray-500">5 روز دیگر</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">کارمندان برتر</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center ml-2">
                  <span className="text-sm font-medium text-blue-600">ع.م</span>
                </div>
                <span className="text-sm text-gray-600">علی محمدی</span>
              </div>
              <span className="text-sm text-green-600">95%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center ml-2">
                  <span className="text-sm font-medium text-blue-600">س.ر</span>
                </div>
                <span className="text-sm text-gray-600">سارا رضایی</span>
              </div>
              <span className="text-sm text-green-600">92%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">شرکت‌های فعال</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 text-green-500 ml-2" />
                <span className="text-sm text-gray-600">شرکت فناوری نوین</span>
              </div>
              <span className="text-sm text-green-600">فعال</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 text-green-500 ml-2" />
                <span className="text-sm text-gray-600">شرکت توسعه نرم‌افزار</span>
              </div>
              <span className="text-sm text-green-600">فعال</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 