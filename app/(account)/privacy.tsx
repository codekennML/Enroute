import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrivacyPolicy: React.FC = () => {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <Text className="px-4 pb-2  text-2xl font-bold  text-foreground">Privacy Policy</Text>
            <ScrollView className="p-4 ">

                <View className="mb-4 " >
                    <Text className="text-xl font-semibold mb-2 text-foreground">1. Introduction</Text>
                    <Text className="text-base mb-2 text-foreground">
                        Welcome to the Tag-Along App ("we," "our," or "us"). We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application (the "App") and related services.
                    </Text>
                    <Text className="text-base mb-2 text-foreground">
                        By using the App, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, do not use the App.
                    </Text>
                </View>

                <View className="mb-4">
                    <Text className="text-xl font-semibold mb-2 text-foreground">2. Information We Collect</Text>
                    <Text className="text-base mb-2 text-foreground">
                        We may collect several types of information from and about users of our App, including:
                    </Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• Personal information (such as name, email address, and phone number)</Text>
                    <Text className="text-base ml-4 mb-1  text-foreground">• Location data</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• Device information</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• Usage data</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• User-generated content</Text>
                </View>

                <View className="mb-4">
                    <Text className="text-xl font-semibold mb-2 text-foreground ">3. How We Use Your Information</Text>
                    <Text className="text-base mb-2 text-foreground">
                        We use the information we collect about you or that you provide to us, including any personal information:
                    </Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• To provide and maintain our App</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• To notify you about changes to our App or any products or services we offer or provide through it</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• To allow you to participate in interactive features of our App</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• To provide customer support</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• To gather analysis or valuable information so that we can improve our App</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• To monitor the usage of our App</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• To detect, prevent and address technical issues</Text>
                    <Text className="text-base ml-4 mb-1">• To fulfill any other purpose for which you provide it</Text>
                </View>

                <View className="mb-4">
                    <Text className="text-xl font-semibold mb-2 text-foreground">4. Disclosure of Your Information</Text>
                    <Text className="text-base mb-2 text-foreground">
                        We may disclose aggregated information about our users, and information that does not identify any individual, without restriction. We may disclose personal information that we collect or you provide as described in this privacy policy:
                    </Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• To our subsidiaries and affiliates</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• To contractors, service providers, and other third parties we use to support our business</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• To fulfill the purpose for which you provide it</Text>
                    <Text className="text-base ml-4 mb-1  text-foreground">• For any other purpose disclosed by us when you provide the information</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• With your consent</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• To comply with any court order, law, or legal process, including to respond to any government or regulatory request</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• To enforce or apply our terms of use and other agreements</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of the company, our customers, or others</Text>
                </View>

                <View className="mb-4">
                    <Text className="text-xl font-semibold mb-2 text-foreground ">5. Data Security</Text>
                    <Text className="text-base mb-2 text-foreground">
                        We have implemented stringent measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. However, we cannot guarantee that unauthorized third parties will never be able to defeat our security measures or use your personal information for improper purposes.
                    </Text>
                </View>

                <View className="mb-4">
                    <Text className="text-xl font-semibold mb-2  text-foreground">6. Changes to Our Privacy Policy</Text>
                    <Text className="text-base mb-2 text-foreground">
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Modified" date at the bottom of this page.
                    </Text>
                </View>

                <View className="mb-4">
                    <Text className="text-xl font-semibold mb-2 text-foreground">7. Limitation of Liability</Text>
                    <Text className="text-base mb-2 text-foreground ">
                        To the fullest extent permitted by applicable law, the company and its affiliates, officers, employees, agents, partners, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                    </Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• Your access to or use of or inability to access or use the App</Text>
                    <Text className="text-base ml-4 mb-1  text-foreground">• Any conduct or content of any third party on the App</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• Any content obtained from the App</Text>
                    <Text className="text-base ml-4 mb-1 text-foreground">• Unauthorized access, use, or alteration of your transmissions or content</Text>
                    <Text className="text-base ml-4 mb-1  text-foreground">• Whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose</Text>
                </View>

                <View className="mb-4">
                    <Text className="text-xl font-semibold mb-2 text-foreground">8. Indemnification</Text>
                    <Text className="text-base mb-2 text-foreground ">
                        You agree to defend, indemnify, and hold harmless the company, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of this Privacy Policy or your use of the App, including, but not limited to, your User Contributions, any use of the App's content, services, and products other than as expressly authorized in this Privacy Policy.
                    </Text>
                </View>

                <View className="mb-4">
                    <Text className="text-xl font-semibold mb-2 text-foreground">9. Contact Us</Text>
                    <Text className="text-base mb-2 text-foreground">
                        If you have any questions about this Privacy Policy, please contact us at:
                    </Text>
                    <Text className="text-base mb-2 text-foreground">
                        [Insert Company Contact Information]
                    </Text>
                </View>

                <Text className="mt-4 text-sm text-gray-600 text-foreground">
                    Last Modified: [Insert Date]
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PrivacyPolicy;